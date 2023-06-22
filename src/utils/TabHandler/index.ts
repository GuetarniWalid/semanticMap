import { extractOriginFromUrl, getProtocol } from '@src/utils';
import { TabError } from '@src/utils/Exception/index';

export class TabHandler {
  private _tabUrl: string;

  constructor(private tabs: chrome.tabs.Tab[]) {
    this.verifyUrl(tabs[0]);
    this._tabUrl = tabs[0].url as string;
  }

  get originUrl() {
    return extractOriginFromUrl(this._tabUrl);
  }

  private extractOriginUrl(tabs: chrome.tabs.Tab[]) {
    const currentTab = tabs[0];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return currentTab.url!;
  }

  private verifyUrl(tab: chrome.tabs.Tab) {
    if (!tab) throw new TabError('No tab found');
    if (!tab.url) throw new TabError('No url found');
    const proptocol = getProtocol(tab.url);
    if (!proptocol.includes('http')) throw new TabError('Invalid protocol');
  }
}
