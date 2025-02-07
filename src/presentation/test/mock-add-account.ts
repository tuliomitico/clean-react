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
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel | undefined> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
