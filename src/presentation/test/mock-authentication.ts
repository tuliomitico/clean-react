import type { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import type { Authentication, AuthenticationParams } from "@/domain/usecases";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  auth = async (
    params: AuthenticationParams,
  ): Promise<AccountModel | undefined> => {
    this.params = params;
    return await Promise.resolve(this.account);
  };
}
