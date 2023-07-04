import * as domutils from 'domutils';
import type { Document as customDocument } from 'domhandler/lib/node';

declare global {
  type domutilsElementList = ReturnType<typeof domutils.findAll>;

  type domutilsElement = domutilsElementList[number];

  type ResponseData = {
    url: string;
    html: string;
    error: boolean;
    status: PageStatus;
  };

  type FinalResponse = ResponseData & {
    dom: customDocument | null;
    isHtml: boolean;
  };

  type Anchors = {
    href: string;
    sameSite: boolean;
    destination: string;
    destinationName: string;
  }[];

  interface PageDom {
    url: string;
    titles: {
      h1: string[];
      h2: string[];
      h3: string[];
      h4: string[];
      h5: string[];
      h6: string[];
    };
    anchors: Anchors;
  }

  type Page = PageDom & { status: PageStatus };

  interface PageStatus {
    state: 'pending' | 'done' | 'error';
    title: string;
    explanation: string;
    code: number;
  }

  interface TreePages {
    [pageName: string]: TreePage;
  }
}
