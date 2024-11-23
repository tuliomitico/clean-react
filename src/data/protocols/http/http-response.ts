export enum HttpStatusCode {
    OK = 200,
    noContent = 204,
    BAD_REQUEST = 400,
    unauthorized = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}

export type HttpResponse<T = object> = {
    statusCode: HttpStatusCode
    body?: T
}