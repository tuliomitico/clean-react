import type { AddAccount } from "@/domain/usecases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { RemoteAddAccount } from "@/data/usecases/add-account/remote-add-account";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl("/signup"), makeAxiosHttpClient());
};
