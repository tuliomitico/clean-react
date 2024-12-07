import type React from "react";
import { createContext } from "react";

export default createContext<{
  state: {
    isLoading: boolean;
    email: string;
    emailError: string;
    passwordError: string;
    mainError: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      email: string;
      emailError: string;
      passwordError: string;
      mainError: string;
    }>
  >;
} | null>(null);
