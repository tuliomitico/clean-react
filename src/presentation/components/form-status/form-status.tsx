import React, { useContext } from "react";
import Styles from "./form-status.module.scss";
import { Spinner } from "../spinner/spinner";
import Context from "@/presentation/contexts/form/form-context";

export function FormStatus(): React.JSX.Element {
  const { state, errorState } = useContext(Context) as {
    state: { isLoading: boolean };
    errorState: {
      email: string;
      password: string;
      main: string;
    };
  };
  const { isLoading } = state;
  const { main } = errorState;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error}>Erro</span>}
    </div>
  );
}
