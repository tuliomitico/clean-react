import React, { useContext } from "react";
import Styles from "./form-status.module.scss";
import { Spinner } from "../spinner/spinner";
import Context from "@/presentation/contexts/form/form-context";

export function FormStatus(): React.JSX.Element {
  const { state } = useContext(Context) as {
    state: {
      isLoading: boolean;
      emailError: string;
      passwordError: string;
      mainError: string;
    };
  };
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
}
