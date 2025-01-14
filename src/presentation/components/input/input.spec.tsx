import React from "react";
import { fireEvent, render, type RenderResult } from "@testing-library/react";
import { Input } from "./input";
import Context from "@/presentation/contexts/form/form-context";
import { faker } from "@faker-js/faker";

const makeSut = (fieldName: string): RenderResult => {
  const result = render(
    <Context.Provider
      value={{
        state: {
          isLoading: false,
          email: "email",
          password: "password",
          emailError: "error",
          passwordError: "error",
          mainError: "error",
        },
        setState: jest.fn(),
      }}
    >
      <Input name={fieldName} />
    </Context.Provider>,
  );
  return result;
};

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const input = sut.getByTestId(field) as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
  test("Should remove readOnly on focus", () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
