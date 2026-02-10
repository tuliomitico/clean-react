import React, { type PropsWithoutRef, useContext, useRef } from "react";
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
      password: string;
      emailError: string;
      passwordError: string;
      mainError: string;
    };
    setState: React.Dispatch<
      React.SetStateAction<{
        isLoading: boolean;
        email: string;
        password: string;
        emailError: string;
        passwordError: string;
        mainError: string;
      }>
    >;
  };
  const inputRef = useRef<HTMLInputElement>(null)
  const { [`${name}Error` as "emailError" | "passwordError"]: error } = state;

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => inputRef.current?.focus()}>{props.placeholder}</label>
    </div>
  );
}
