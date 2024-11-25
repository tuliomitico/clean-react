import type { HttpPostParams } from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient {
  post = async (params: HttpPostParams<unknown>): Promise<void> => {
    await axios(params.url);
  };
}
