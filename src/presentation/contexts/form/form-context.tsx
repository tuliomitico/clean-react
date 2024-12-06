import { createContext } from "react";

export default createContext<{
  state: { isLoading: boolean };
  errorState: {
    email: string;
    password: string;
    main: string;
  };
} | null>(null);
