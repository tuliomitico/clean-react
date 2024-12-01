import { createContext } from "react";

export default createContext<{
  isLoading: boolean;
  errorMessage: string;
} | null>(null);
