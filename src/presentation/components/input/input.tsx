import React, { type PropsWithoutRef, useContext } from "react";
import Styles from "./input.module.scss";
import Context from "@/presentation/contexts/form/form-context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: PropsWithoutRef<Props>): React.JSX.Element {
  const { name } = props;
  const { state, setState } = useContext(Context) as {
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
  };
  const { [`${name}Error` as "emailError" | "passwordError"]: error } = state;
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };
  const getStatus = (): string => {
    return "🔴";
  };
  const getTitle = (): string => {
    return error;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
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
