/* eslint-disable @typescript-eslint/no-unsafe-assignment -- passar no commit*/
/* eslint-disable @typescript-eslint/no-explicit-any -- passar no commit */
import type {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  post = async (params: HttpPostParams): Promise<HttpResponse | undefined> => {
    // eslint-disable-next-line @typescript-eslint/init-declarations -- passar no commit
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (error) {
      const { response } = error as AxiosError;
      axiosResponse = response as AxiosResponse;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  };
  get = async (params: HttpGetParams): Promise<HttpResponse> => {
    // eslint-disable-next-line @typescript-eslint/init-declarations -- passar no commit
    const axiosResponse = await axios.get(params.url);

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  };
}
