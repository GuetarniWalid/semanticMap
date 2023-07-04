import { RequestAction } from '../enum';

export class DataModeler {
  private static instance: DataModeler | null = null;
  private treePage: TreePage = {} as TreePage;
  private _index: { [pageUrl: string]: TreePage } = {};
  private debounceId?: NodeJS.Timeout;
  private currentTreePagePath: string[] = ['this'];
  private currentPageNumber = '';

  public static getInstance(): DataModeler {
    if (!DataModeler.instance) {
      DataModeler.instance = new DataModeler();
    }
    return DataModeler.instance;
  }

  get tree() {
    return this.treePage;
  }

  get index() {
    return this._index;
  }

  public createNewTreePage(
    url: string,
    pageNumber: number,
    parantRef?: TreePage,
    toIndex = true
  ): TreePage {
    const page = {
      url,
      title: '',
      status: {
        state: 'pending' as const,
        title: 'Chargement en cours',
        explanation: 'La page est en cours de chargement',
        code: 0,
      },
    };

    // first page
    if (!parantRef) {
      this.treePage = { ...page, treePath: 'this' };
      this.indexTreePage(url, this.treePage);
      return this.treePage;
    }

    // other pages
    if (!parantRef.children) parantRef.children = {};
    parantRef.children[`page${pageNumber}`] = {
      ...page,
      treePath: `${parantRef.treePath}.children.page${pageNumber}`,
    };
    if (toIndex)
      this.indexTreePage(url, parantRef.children[`page${pageNumber}`]);
    this.treePageChangedEvent();
    return parantRef.children[`page${pageNumber}`];
  }

  private indexTreePage(url: string, page: TreePage): void {
    this._index[url] = page;
  }

  public updateTreePage(treepageRef: TreePage, page?: Page) {
    if (!page) {
      treepageRef.status = {
        state: 'error',
        title: 'Error inconnu',
        explanation: 'Une erreur inconnue est survenue',
        code: 404,
      };
      return;
    }
    treepageRef.title = page.titles.h1[0];
    treepageRef.status = page.status;
    this.treePageChangedEvent();
  }

  public addTreePageAlreadyExist(
    pageNumber: number,
    treePage: TreePage,
    parantRef?: TreePage
  ) {
    const ref = this.createNewTreePage(
      treePage.url,
      pageNumber,
      parantRef,
      false
    );
    for (const key in ref) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete ref[key];
    }
    ref.url = treePage.url;
    ref.sameAs = treePage.treePath;
  }

  private treePageChangedEvent() {
    this.debounce(() => {
      chrome.runtime.sendMessage({
        action: RequestAction.TreePageChange,
        data: this.treePage,
      });
    });
  }

  private debounce(func: () => unknown): void {
    if (this.debounceId) return;

    this.debounceId = setTimeout(() => {
      this.debounceId = undefined;
      func();
    }, 500);
  }
}
