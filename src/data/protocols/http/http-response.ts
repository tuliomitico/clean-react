export enum HttpStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  FORBIDDEN = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = object> = {
  statusCode: HttpStatusCode;
  body?: T;
};
