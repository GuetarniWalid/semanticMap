import { TabHandler } from './data/TabHandler';
import { RecursiveFetchPage } from './data/Fetcher/RecursiveFetchPage';
import { LoadCocoonError } from './data/Exception';

export function loadCocoon(sendResponse: () => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    try {
      const originUrl = TabHandler.getInstance(tabs).originUrl;
      const recursiveFetchPage = new RecursiveFetchPage(originUrl, 2);
      await recursiveFetchPage.start();
      sendResponse();
    } catch (cause) {
      sendResponse();
      throw new LoadCocoonError('', { cause });
    }
  });

  return true;
}
