import React from "react";
import Styles from "./form-status.module.scss";
import { Spinner } from "../spinner/spinner";

export function FormStatus(): React.JSX.Element {
  return (
    <>
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Erro</span>
      </div>
    </>
  );
}
