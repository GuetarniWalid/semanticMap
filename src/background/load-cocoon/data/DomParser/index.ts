import type { Document as domhandlerDocument } from 'domhandler/lib/node';
import { AnchorsParser } from './AnchorsParser';
import { TitleParser } from './TitleParser';

export class DomParser {
  private anchorsParser: AnchorsParser;
  private titleParser: TitleParser;
  private _page: PageDom | undefined;

  constructor(
    private dom: domhandlerDocument | null,
    originUrl: string,
    private url: string
  ) {
    if (!dom) {
      this.createEmptyPage();
    }
    this.anchorsParser = new AnchorsParser(this.dom, originUrl);
    this.titleParser = new TitleParser(this.dom);
  }

  get page(): PageDom {
    if (this._page) return this._page;
    this._page = {
      url: this.url,
      titles: this.getTitles(),
      anchors: this.getAnchors(),
    };
    return this._page;
  }

  private createEmptyPage() {
    this._page = {
      url: this.url,
      titles: {
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
      },
      anchors: [],
    } as PageDom;
  }

  private getTitles() {
    return this.titleParser.titles;
  }

  private getAnchors() {
    return this.anchorsParser.getAnchors('all') || [];
  }
}
