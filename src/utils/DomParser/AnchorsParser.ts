import type { Document as customDocument } from 'domhandler/lib/node';
import * as domutils from 'domutils';
import { getProtocol } from '@src/utils';

export class AnchorsParser {
  private _outgoingAnchors: domutilsElementList;
  private _baseUrl: URL | null = null;

  constructor(private dom: customDocument | null, private originUrl: string) {
    if (!dom) {
      this._outgoingAnchors = [];
      return;
    }
    this._baseUrl = new URL(originUrl);
    const allAnchors = this.getAllAnchors(dom);
    this._outgoingAnchors = this.getOutgoingAnchors(allAnchors);
  }

  get anchors() {
    return this._outgoingAnchors.map(anchor => {
      const { destination, destinationName, isSameSite } =
        this.getDestinationData(anchor);
      return {
        href: anchor.attribs.href,
        sameSite: isSameSite,
        destination,
        destinationName,
      };
    });
  }

  private getAllAnchors(dom: customDocument) {
    const links = domutils.findAll(el => el.name === 'a', dom.children);
    return Array.from(links);
  }

  private getOutgoingAnchors(anchors: domutilsElementList) {
    const httpAnchors = this.removeNonHttpAnchors(anchors);
    return httpAnchors;
  }

  private removeNonHttpAnchors(anchors: domutilsElementList) {
    return anchors.filter(anchor => {
      if (!this.hasHrefattribute(anchor)) return false;
      if (this.isSkipAnchor(anchor)) return false;
      return (
        this.hasRelativePath(anchor) ||
        getProtocol(anchor.attribs.href).includes('http')
      );
    });
  }

  private hasHrefattribute(anchor: domutilsElement) {
    return anchor.attribs.href;
  }

  private isSkipAnchor(anchor: domutilsElement) {
    const href = anchor.attribs.href;
    return href[0] === '#' || href.includes('javascript');
  }

  private hasRelativePath(anchor: domutilsElement) {
    const href = anchor.attribs.href;
    return href[0] === '.' || href[0] === '/';
  }

  private getDestinationData(anchor: domutilsElement) {
    const destination = new URL(anchor.attribs.href, this._baseUrl!);
    return {
      destination: destination.href,
      destinationName: destination.hostname,
      isSameSite: destination.hostname === this._baseUrl!.hostname,
    };
  }
}
