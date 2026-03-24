import {
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse,
  HttpStatusCode,
} from "../protocols/http";
import { faker } from "@faker-js/faker";

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {},
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };
  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return this.response;
  }
}
