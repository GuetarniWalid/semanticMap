declare global {
  interface ChromeSendMessagePayload {
    action: string;
    data: object | null;
  }

  interface TreePage {
    url: string;
    title: string;
    status: PageStatus;
    children?: TreePages;
    treePath: string;
    sameAs?: string;
  }
}

export {};
