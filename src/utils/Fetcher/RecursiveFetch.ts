import { Fetcher } from '@src/utils/Fetcher';
import { FetchError, DomError } from '@src/utils/Exception';
import { DomParser } from '@src/utils/DomParser';

export class RecursiveFetchPages {
  private fetchCount = 0;
  private pagesTree: PagesTree = { index: {} };

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly originUrl: string,
    private readonly limitDepth: number,
    private readonly limitFetch: number
  ) {}

  public async getDiagramData() {
    return 1;
  }

  public async start() {
    await this.recursiveFetchAnchors(this.originUrl);
  }

  private async recursiveFetchAnchors(
    url: string,
    depth = 0,
    pageNumber = 1,
    brothersCount = 0
  ) {
    const shouldFetchPage = this.shouldFetchPage(url, depth);
    if (!shouldFetchPage) return;

    const treePageRef = this.createNewTreePage(url, depth, pageNumber);
    const page = await this.fetchPage(url);
    this.fetchCount++;

    if (!page) return;
    this.updateTreePage(treePageRef, page);

    const promises = page..map(async (page, index) => {
      await this.recursiveFetchAnchors(page.href, depth + 1, index++);
    });
    await Promise.all(promises);
  }

  private async fetchPage(url: string) {
    try {
      const fetcher = new Fetcher(url);
      const response = (await fetcher.get()).response;
      if (response.error) throw new FetchError('', { props: response });
      if (!response.dom)
        throw new DomError('', { props: { dom: response.dom } });
      const page = new DomParser(response.dom, this.originUrl, url).page;
      return page;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (error instanceof FetchError) console.error(error, error.status);
      else console.error(error);
    }
  }

  private shouldFetchPage(url: string, depth: number): boolean {
    if (this.pagesTree.index[url]) return false;
    if (this.fetchCount >= this.limitFetch) return false;
    if (depth >= this.limitDepth) return false;
    return true;
  }

  private createNewTreePage(
    url: string,
    depth: number,
    pageNumber: number
  ): TreePage {
    this.indexTreePage(url, depth, pageNumber);
    this.pagesTree[`depth${depth}`][`page${pageNumber}`] = {
      url,
      title: '',
      linkToBrothers: [],
      isLinkedToParent: false,
      state: 'pending',
    };
    return this.pagesTree[`depth${depth}`][`page${pageNumber}`];
  }

  private indexTreePage(url: string, depth: number, pageNumber: number): void {
    this.pagesTree.index = {
      [url]: this.pagesTree[`depth${depth}`][`page${pageNumber}`],
    };
  }

  private updateTreePage(
    treepageRef: TreePage,
    page: Page
  ) {
    treepageRef.title = page.titles.h1[0];
    treepageRef.linkToBrothers = page.anchors.filter(anchor => anchor.sameSite)
    treepageRef.isLinkedToParent = false;
    treepageRef.state = 'done';
  }
}
