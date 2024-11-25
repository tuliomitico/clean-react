import type {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  post = async (
    params: HttpPostParams<unknown>,
  ): Promise<HttpResponse<unknown>> => {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  };
}
