import type { AddAccountParams } from "@/domain/usecases";
import { RemoteAddAccount } from "./remote-add-account";
import { HttpPostClientSpy } from "@/data/test";
import type { AccountModel } from "@/domain/models";
import { faker } from "@faker-js/faker";
import { mockAddAccount } from "@/domain/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { EmailInUseError } from "@/domain/errors/email-in-use-error";
import { UnexpectedError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccount();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test("Should throw EmailInUseError if HttpPostClient returns 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const addAccountParams = mockAddAccount();
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const addAccountParams = mockAddAccount();
    const promise = sut.add(addAccountParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  //   test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
  //     const { sut, httpPostClientSpy } = makeSut();
  //     httpPostClientSpy.response = {
  //       statusCode: HttpStatusCode.serverError,
  //     };
  //     const authenticationParams = mockAuthentication();
  //     const promise = sut.auth(authenticationParams);
  //     await expect(promise).rejects.toThrow(new UnexpectedError());
  //   });
  //   test("Should throw UnexpectedError if HttpPostClient returns 404", async () => {
  //     const { sut, httpPostClientSpy } = makeSut();
  //     httpPostClientSpy.response = {
  //       statusCode: HttpStatusCode.notFound,
  //     };
  //     const authenticationParams = mockAuthentication();
  //     const promise = sut.auth(authenticationParams);
  //     await expect(promise).rejects.toThrow(new UnexpectedError());
  //   });
  //   test("Should return an AccountModel if HttpPostClient returns 200", async () => {
  //     const { sut, httpPostClientSpy } = makeSut();
  //     const httpResult = mockAccountModel();
  //     httpPostClientSpy.response = {
  //       statusCode: HttpStatusCode.ok,
  //       body: httpResult,
  //     };
  //     const account = await sut.auth(mockAuthentication());
  //     expect(account).toEqual(httpResult);
  //   });
});
