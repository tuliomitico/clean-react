import React from "react";
import Styles from "./form-status.module.scss";
import { Spinner } from "../spinner/spinner";
import Context from "@/presentation/contexts/form/form-context";

export function FormStatus(): React.JSX.Element {
  const { isLoading, errorMessage } = React.useContext(Context) as {
    isLoading: boolean;
    errorMessage: string;
  };
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Erro</span>}
    </div>
  );
}
