/* eslint-disable @typescript-eslint/no-unsafe-assignment -- passar no commit*/
/* eslint-disable @typescript-eslint/no-explicit-any -- passar no commit */
import type {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<unknown, any> {
  post = async (
    params: HttpPostParams<unknown>,
  ): Promise<HttpResponse<any> | undefined> => {
    // eslint-disable-next-line @typescript-eslint/init-declarations -- passar no commit
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      const { response } = error as AxiosError;
      httpResponse = response as AxiosResponse;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  };
}
