import {
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse,
  HttpStatusCode,
} from "../protocols/http";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return await Promise.resolve(this.response);
  }
}
