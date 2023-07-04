import { loadCocoon } from './load-cocoon';
import { RequestAction } from './load-cocoon/data/enum';

chrome.runtime.onMessage.addListener(
  (
    request: ChromeSendMessagePayload,
    sender: chrome.runtime.MessageSender,
    sendResponse: (payload?: TreePage) => void
  ) => {
    if (request.action === RequestAction.LoadCocoon) {
      loadCocoon(sendResponse);
    }
    return true;
  }
);
