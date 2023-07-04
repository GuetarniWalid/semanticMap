import { getProtocol } from '../utils';
import { TabError } from '../Exception';

export class TabHandler {
  private static instance: TabHandler | null = null;
  private _tabUrl: string;
  private _originUrl: string | null = null;

  constructor(private tabs: chrome.tabs.Tab[]) {
    this.verifyUrl(tabs[0]);
    this._tabUrl = tabs[0].url as string;
  }

  public static getInstance(tabs: chrome.tabs.Tab[]): TabHandler {
    if (!TabHandler.instance) {
      TabHandler.instance = new TabHandler(tabs);
    }
    return TabHandler.instance;
  }

  get originUrl() {
    if (this._originUrl) return this._originUrl;
    const urlObject = new URL(this._tabUrl);
    this._originUrl = urlObject.origin;
    return urlObject.origin;
  }

  private verifyUrl(tab: chrome.tabs.Tab) {
    if (!tab) throw new TabError('No tab found');
    if (!tab.url) throw new TabError('No url found');
    const proptocol = getProtocol(tab.url);
    if (!proptocol.includes('http')) throw new TabError('Invalid protocol');
  }
}
