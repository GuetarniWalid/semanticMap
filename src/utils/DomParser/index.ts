import type { Document as domhandlerDocument } from 'domhandler/lib/node';
import { AnchorsParser } from './AnchorsParser';
import { TitleParser } from './TitleParser';

export class DomParser {
  private anchorsParser: AnchorsParser;
  private titleParser: TitleParser;
  private _page: Page | undefined;
  private filterModifier: 'add' | 'remove' | 'neutral' = 'neutral';

  constructor(
    private dom: domhandlerDocument,
    originUrl: string,
    private url: string
  ) {
    this.anchorsParser = new AnchorsParser(dom, originUrl);
    this.titleParser = new TitleParser(dom);
  }

  get page(): Page {
    if (this._page) return this._page;
    this._page = {
      url: this.url,
      titles: this.getTitles(),
      anchors: this.getAnchors(),
    };
    return this._page;
  }

  public getPage() {
    return this;
  }

  public with() {
    this.filterModifier = 'add';
    return this;
  }

  public without() {
    this.filterModifier = 'remove';
    return this;
  }

  public externalLinks() {
    const page = { ...this.page };
    return page.anchors.filter(anchor => {
      return this.filterModifier === 'add' ? !anchor.sameSite : anchor.sameSite;
    });
  }

  private getTitles() {
    return this.titleParser.titles;
  }

  private getAnchors() {
    return this.anchorsParser.anchors;
  }
}
