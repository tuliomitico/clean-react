import type { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import type {
  AddAccount,
  AddAccountParams,
  AuthenticationParams,
} from "@/domain/usecases";

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AuthenticationParams;

  async add(params: AddAccountParams): Promise<AccountModel | undefined> {
    this.params = params;
    return this.account;
  }
}
