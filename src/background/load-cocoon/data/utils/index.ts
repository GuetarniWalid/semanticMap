export function getProtocol(url: string) {
  try {
    return new URL(url).protocol;
  } catch (error) {
    return '';
  }
}
