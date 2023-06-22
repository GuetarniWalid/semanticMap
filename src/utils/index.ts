export function extractOriginFromUrl(url: string): string {
  const urlObject = new URL(url);
  return urlObject.origin;
}

export function getProtocol(url: string) {
  return new URL(url).protocol;
}
