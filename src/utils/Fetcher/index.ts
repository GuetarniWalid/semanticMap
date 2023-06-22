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
      html: response.ok ? await response.text() : '',
      error: !response.ok,
      status: this.statusDescription(response.status),
    };
  }

  private statusDescription(statusCode: number) {
    let title, explanation;

    switch (statusCode) {
      case 200:
        title = 'OK';
        explanation = 'La requête a été traitée avec succès. Tout va bien !';
        break;

      case 201:
        title = 'Créé';
        explanation =
          'La requête a été traitée avec succès et une nouvelle ressource a été créée.';
        break;

      case 204:
        title = 'Aucun contenu';
        explanation =
          "La requête a été traitée avec succès, mais il n'y a pas de contenu à renvoyer.";
        break;

      case 301:
        title = 'Déplacé de façon permanente';
        explanation =
          'La ressource demandée a été déplacée de manière permanente vers une nouvelle URL. La nouvelle URL est fournie dans la réponse.';
        break;

      case 302:
        title = 'Déplacé de façon temporaire';
        explanation =
          'La ressource demandée a été déplacée de manière temporaire vers une nouvelle URL. La nouvelle URL est fournie dans la réponse.';
        break;

      case 400:
        title = 'Requête incorrecte';
        explanation =
          "La requête était mal formée ou n'a pas pu être traitée en raison d'une erreur du client. Il y a une erreur quelque part dans la requête envoyée par le navigateur.";
        break;

      case 401:
        title = 'Non autorisé';
        explanation =
          "L'utilisateur n'est pas autorisé à accéder à la ressource demandée. Il doit s'authentifier auprès du serveur pour accéder à la ressource.";
        break;

      case 403:
        title = 'Interdit';
        explanation =
          "L'utilisateur n'est pas autorisé à accéder à la ressource demandée, même si l'authentification a été fournie. L'utilisateur n'a pas les autorisations nécessaires pour accéder à la ressource.";
        break;

      case 404:
        title = 'Introuvable';
        explanation =
          "La ressource demandée n'a pas été trouvée sur le serveur. Le serveur n'a pas pu trouver ce que le navigateur cherche.";
        break;

      case 500:
        title = 'Erreur interne du serveur';
        explanation =
          "Une erreur s'est produite sur le serveur lors du traitement de la requête. Il y a une erreur quelque part sur le serveur.";
        break;

      default:
        title = "Code d'état non reconnu";
        explanation = "Le code d'état fourni n'est pas reconnu.";
        break;
    }

    return { title, explanation, code: statusCode };
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
