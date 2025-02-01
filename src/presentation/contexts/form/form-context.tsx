import type React from "react";
import { createContext } from "react";

export default createContext<{
  state: {
    isLoading: boolean;
    name?: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
    nameError?: string;
    emailError: string;
    passwordError: string;
    passwordConfirmationError?: string;
    mainError: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      name?: string;
      email: string;
      password: string;
      passwordConfirmation?: string;
      nameError?: string;
      emailError: string;
      passwordError: string;
      passwordConfirmationError?: string;
      mainError: string;
    }>
  >;
} | null>(null);
