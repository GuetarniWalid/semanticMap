import { parseDocument } from 'htmlparser2';
import { isDocument } from 'domhandler';
import type { Document as customDocument } from 'domhandler/lib/node';

export class Fetcher {
  private responseData: ResponseData | null = null;

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly url: string) {}

  get response() {
    return this.createFinalResponse(this.responseData as ResponseData);
  }

  public async get() {
    this.responseData = await this.fetchHtml();
    return this;
  }

  private async fetchHtml(): Promise<ResponseData> {
    try {
      const response = await fetch(this.url);
      const responseFormatted = await this.formatResponse(response);
      return responseFormatted;
    } catch (error) {
      return {
        html: '',
        error: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errorMessage: error.message,
        status: this.statusDescription(0),
      };
    }
  }

  private async formatResponse(response: Response): Promise<ResponseData> {
    return {
      url: this.url,
      html: response.ok ? await response.text() : '',
      error: !response.ok,
      status: this.statusDescription(response.status),
    };
  }

  private statusDescription(statusCode: number): PageStatus {
    let title: string, explanation: string, state: 'done' | 'error';

    switch (statusCode) {
      case 200:
        state = 'done';
        title = 'OK';
        explanation = 'La requête a été traitée avec succès.';
        break;

      case 301:
        state = 'done';
        title = 'Déplacé de façon permanente';
        explanation =
          'La ressource demandée a été déplacée de manière permanente vers une nouvelle URL.';
        break;

      case 302:
        state = 'done';
        title = 'Déplacé de façon temporaire';
        explanation =
          'La ressource demandée a été déplacée de manière temporaire vers une nouvelle URL.';
        break;

      case 400:
        state = 'error';
        title = 'Requête incorrecte';
        explanation =
          "La requête était mal formée ou n'a pas pu être traitée en raison d'une error du client.";
        break;

      case 401:
        state = 'error';
        title = 'Non autorisé';
        explanation =
          'Une authentification est nécessaire pour accéder à la ressource.';
        break;

      case 403:
        state = 'error';
        title = 'Interdit';
        explanation =
          "Le serveur a compris la requête, mais refuse de l'exécuter.";
        break;

      case 404:
        state = 'error';
        title = 'Introuvable';
        explanation = 'Ressource non trouvée.';
        break;

      case 429:
        state = 'error';
        title = 'Trop de requêtes';
        explanation = 'Le client a émis trop de requêtes dans un délai donné.';
        break;

      case 500:
        state = 'error';
        title = 'Erreur serveur';
        explanation = 'Erreur interne du serveur.';
        break;

      case 502:
        state = 'error';
        title = 'Mauvaise passerelle';
        explanation =
          'En agissant en tant que serveur proxy ou passerelle, le serveur a reçu une réponse invalide depuis le serveur distant.';
        break;

      case 503:
        state = 'error';
        title = 'Service indisponible';
        explanation = 'Service temporairement indisponible ou en maintenance.';
        break;

      case 504:
        state = 'error';
        title = 'Délai d’attente dépassé';
        explanation =
          'Temps d’attente d’une réponse d’un serveur à un serveur intermédiaire écoulé.';
        break;

      default:
        state = 'error';
        title = "Code d'état non reconnu";
        explanation = "Le code d'état fourni n'est pas reconnu.";
        break;
    }

    return { state, title, explanation, code: statusCode };
  }

  private ParseHtmlString(html: string) {
    const dom = parseDocument(html);
    return dom;
  }

  private isHtmlDoc(node: customDocument) {
    return isDocument(node);
  }

  private createFinalResponse(responseData: ResponseData): FinalResponse {
    const dom = this.ParseHtmlString(responseData.html);
    return {
      ...responseData,
      isHtml: this.isHtmlDoc(dom),
      dom: this.isHtmlDoc(dom) ? dom : null,
    };
  }
}
