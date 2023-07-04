import { useState, useEffect } from 'preact/hooks';
import { RequestAction } from './enum';

export const useLoadCocoon = () => {
  const [pages, setPages] = useState<TreePage | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage<ChromeSendMessagePayload>({
      action: RequestAction.LoadCocoon,
      data: null,
    });

    const handleResponse = (message: ChromeSendMessagePayload) => {
      if (message) setPages(message.data as TreePage);
    };

    chrome.runtime.onMessage.addListener(handleResponse);

    return () => {
      chrome.runtime.onMessage.removeListener(handleResponse);
    };
  }, []);

  return pages;
};
