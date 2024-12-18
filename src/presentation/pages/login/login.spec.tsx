import React from "react";
import {
  render,
  type RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import {
  unstable_HistoryRouter as HistoryRouter,
  type HistoryRouterProps,
} from "react-router-dom";
import { createMemoryHistory } from "history";
import "jest-localstorage-mock";
import { Login } from "./login";
import { faker } from "@faker-js/faker/.";
import { ValidationStub } from "@/presentation/test";
import { AuthenticationSpy } from "@/presentation/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const initialEntries = ["/login", ""];
const history = createMemoryHistory({ initialEntries });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError ?? "";
  const sut = render(
    <HistoryRouter
      history={history as unknown as HistoryRouterProps["history"]}
    >
      <Login validation={validationStub} authentication={authenticationSpy} />,
    </HistoryRouter>,
  );
  return {
    sut,
    authenticationSpy,
  };
};

const populateEmailInput = (
  sut: RenderResult,
  email = faker.internet.email(),
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordInput = (
  sut: RenderResult,
  password = faker.internet.password(),
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  populateEmailInput(sut, email);
  populatePasswordInput(sut, password);
  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError ?? "Tudo certo!");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login Component", () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  test("Should start with initial state", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    simulateStatusForField(sut, "email", validationError);
    simulateStatusForField(sut, "password", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populateEmailInput(sut);
    simulateStatusForField(sut, "email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populatePasswordInput(sut);
    simulateStatusForField(sut, "password", validationError);
  });

  test("Should show valid email state if Validation succeds", () => {
    const { sut } = makeSut();
    populateEmailInput(sut);
    simulateStatusForField(sut, "email");
  });

  test("Should show valid password state if Validation succeds", () => {
    const { sut } = makeSut();
    populatePasswordInput(sut);
    simulateStatusForField(sut, "password");
  });

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailInput(sut);
    populatePasswordInput(sut);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on loading", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test("Should call Authentication only once", () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is invalid", () => {
    const validationError = faker.lorem.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailInput(sut);
    fireEvent.submit(sut.getByTestId("form"));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId("error-wrap");
    await waitFor(() => errorWrap);
    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test("Should add accessToken on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId("form"));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      authenticationSpy.account.accessToken,
    );
    expect(initialEntries.length).toBe(2);
    expect(history.location.pathname).toBe("/");
  });

  test("Should go to signup page", async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signup");
    fireEvent.click(register);

    expect(initialEntries.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
