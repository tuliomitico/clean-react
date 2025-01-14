import React from "react";
import { render } from "@testing-library/react";
import { Input } from "./input";
import Context from "@/presentation/contexts/form/form-context";

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const state = {
      isLoading: false,
      email: "email",
      password: "password",
      emailError: "error",
      passwordError: "error",
      mainError: "error",
    };
    const { getByTestId } = render(
      <Context.Provider
        value={{
          state,
          setState: jest.fn(),
        }}
      >
        <Input name="field" />
      </Context.Provider>,
    );
    const input = getByTestId("field") as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
});
