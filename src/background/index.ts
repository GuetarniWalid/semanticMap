import { TabHandler } from '@src/utils/TabHandler';
import { Fetcher } from '@src/utils/Fetcher';
import { FetchError } from '@src/utils/Exception';
import { AnchorsParser } from '@src/utils/DomParser/AnchorsParser';

chrome.runtime.onMessage.addListener(
  (
    request: string,
    sender: chrome.runtime.MessageSender,
    sendResponse: (payload?: OutgoingAnchors) => void
  ) => {
    if (request === 'loadCocon') {
      chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
        try {
          const originUrl = new TabHandler(tabs).originUrl;
          const fetcher = new Fetcher(originUrl);
          const response = (await fetcher.get()).response;
          if (response.error) throw new FetchError('', { props: response });
          const anchors = new AnchorsParser(response.dom, originUrl)
            .anchorsToSameSite;
          sendResponse(anchors);
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (error instanceof FetchError) console.error(error, error.status);
          else console.error(error);
          sendResponse();
        }
      });
    }
    return true;
  }
);
