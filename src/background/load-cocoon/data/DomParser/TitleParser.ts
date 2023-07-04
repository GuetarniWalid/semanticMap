import type {
  Document as domhandlerDocument,
  Element as domhandlerElement,
} from 'domhandler/lib/node';
import * as domutils from 'domutils';

export class TitleParser {
  private _titles: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  } = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };

  constructor(private dom: domhandlerDocument | null) {
    if (dom) {
      this.getAllTitles(dom);
    }
  }

  get titles() {
    return this._titles;
  }

  private getAllTitles(dom: domhandlerDocument) {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    headings.forEach(heading => {
      this.getTitles(dom, heading);
    });
  }

  private getTitles(
    dom: domhandlerDocument,
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  ) {
    const headings = domutils.findAll(el => el.name === heading, dom.children);
    this._titles[heading] = headings.map(heading => this.getInnerText(heading));
  }

  private getInnerText(element: domhandlerElement): string {
    const innerText = domutils.textContent(element);
    const textCleaned = innerText.trim();
    return textCleaned;
  }
}
