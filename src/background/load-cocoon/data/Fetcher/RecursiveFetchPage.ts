import { Fetcher } from './index';
import { DomParser } from '../DomParser';
import { DataModeler } from '../DataModeler';

export class RecursiveFetchPage {
  private dataModeler: DataModeler;
  private fetchCount = 1;

  constructor(
    private readonly originUrl: string,
    private readonly limitDepth: number,
    private readonly limitFetch?: number
  ) {
    this.dataModeler = DataModeler.getInstance();
  }

  public async start(mode: 'speed' | 'depth' = 'depth') {
    if (mode === 'speed') {
      await this.speedRecursiveFetch(this.originUrl);
    } else {
      await this.depthRecursiveFetch(this.originUrl);
    }
  }

  private async speedRecursiveFetch(
    url: string,
    depth = 0,
    pageNumber = 1,
    treeParentPageRef?: TreePage
  ) {
    const shouldFetchPage = this.shouldFetchPage(
      url,
      depth,
      pageNumber,
      treeParentPageRef
    );
    if (!shouldFetchPage) return;

    const treePageRef = this.dataModeler.createNewTreePage(
      url,
      pageNumber,
      treeParentPageRef
    );
    const page = await this.fetchPage(url);
    this.dataModeler.updateTreePage(treePageRef, page);
    this.fetchCount++;
    if (!page) return;

    const promises = page.anchors.map(async (anchor, index) => {
      await this.speedRecursiveFetch(
        anchor.destination,
        depth + 1,
        ++index,
        treePageRef
      );
    });
    await Promise.all(promises);
  }

  private async depthRecursiveFetch(rootUrl: string) {
    const depth = 0;
    const pageNumber = 1;
    let queue = [
      { url: rootUrl, depth, pageNumber, treeParentPageRef: undefined },
    ] as {
      url: string;
      depth: number;
      pageNumber: number;
      treeParentPageRef: TreePage | undefined;
    }[];
    let nextQueue: typeof queue = [];

    while (queue.length > 0) {
      const processing = queue.map(async current => {
        const shouldFetchPage = this.shouldFetchPage(
          current.url,
          current.depth,
          current.pageNumber,
          current.treeParentPageRef
        );
        if (!shouldFetchPage) return;

        const treePageRef = this.dataModeler.createNewTreePage(
          current.url,
          current.pageNumber,
          current.treeParentPageRef
        );
        const page = await this.fetchPage(current.url);
        this.dataModeler.updateTreePage(treePageRef, page);
        this.fetchCount++;
        if (!page) return;

        let childPageNumber = 1;
        for (const anchor of page.anchors) {
          nextQueue.push({
            url: anchor.destination,
            depth: current.depth + 1,
            pageNumber: childPageNumber++,
            treeParentPageRef: treePageRef,
          });
        }
      });

      // wait for all fetches at this depth level to complete
      await Promise.all(processing);

      // move to the next depth level
      queue = nextQueue;
      nextQueue = [];
    }
  }

  private async fetchPage(url: string): Promise<Page | undefined> {
    try {
      const fetcher = new Fetcher(url);
      const page = (await fetcher.get()).response;
      const pageDom = new DomParser(page.dom, this.originUrl, url).page;
      return {
        ...pageDom,
        status: page.status,
      };
    } catch (error) {
      console.error(error);
    }
  }

  private shouldFetchPage(
    url: string,
    depth: number,
    pageNumber: number,
    treeParentPageRef?: TreePage
  ): boolean {
    if (this.dataModeler.index[url]) {
      this.dataModeler.addTreePageAlreadyExist(
        pageNumber,
        this.dataModeler.index[url],
        treeParentPageRef
      );
      return false;
    }
    if (this.limitFetch && this.fetchCount > this.limitFetch) return false;
    if (depth > this.limitDepth) return false;
    return true;
  }
}
