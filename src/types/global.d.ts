import * as domutils from 'domutils';
import type { Document as customDocument } from 'domhandler/lib/node';

declare global {
  type domutilsElementList = ReturnType<typeof domutils.findAll>;

  type domutilsElement = domutilsElementList[number];

  type ResponseData = {
    html: string;
    error: boolean;
    status: {
      title: string;
      explanation: string;
      code: number;
    };
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

  interface Page {
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

  interface TreeNode {
    name?: string;
    children?: TreeNode[] | null;
  }

  type TreePage = {
    url: string;
    title: string;
    linkToBrothers: string[];
    isLinkedToParent: boolean;
    state: 'pending' | 'done' | 'error';
  };

  type TreeDepth = {
    [pageName: string]: TreePage;
  };

  type PagesTree = {
    [depthName: string]: TreeDepth;
    index: { [pageUrl: string]: TreePage };
  };
}
