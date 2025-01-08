/* eslint-disable @typescript-eslint/no-unsafe-assignment -- passar no commit*/
/* eslint-disable @typescript-eslint/no-explicit-any -- passar no commit */
import type {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<unknown, any> {
  post = async (
    params: HttpPostParams<unknown>,
  ): Promise<HttpResponse<any>> => {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  };
}
