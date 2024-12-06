import React, { type PropsWithoutRef, useContext } from "react";
import Styles from "./input.module.scss";
import Context from "@/presentation/contexts/form/form-context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: PropsWithoutRef<Props>): React.JSX.Element {
  const { name } = props;
  const { errorState } = useContext(Context) as {
    state: { isLoading: boolean };
    errorState: {
      email: string;
      password: string;
      main: string;
    };
  };
  const { [name as "email" | "password"]: error } = errorState;
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };
  const getStatus = (): string => {
    return "🔴";
  };
  const getTitle = (): string => {
    return error;
  };
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
}
