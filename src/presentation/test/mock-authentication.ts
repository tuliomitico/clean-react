import type { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import type { Authentication, AuthenticationParams } from "@/domain/usecases";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;
  auth = async (
    params: AuthenticationParams,
  ): Promise<AccountModel | undefined> => {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  };
}
