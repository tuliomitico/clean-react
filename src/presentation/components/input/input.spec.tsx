import React from "react";
import { render, type RenderResult } from "@testing-library/react";
import { Input } from "./input";
import Context from "@/presentation/contexts/form/form-context";

const makeSut = (): RenderResult => {
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
      <Input name="field" />
    </Context.Provider>,
  );
  return result;
};

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const sut = makeSut();

    const input = sut.getByTestId("field") as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
});
