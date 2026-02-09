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
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <label
        onClick={() => inputRef.current?.focus()}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || "Tudo certo!"}

        className={Styles.status}
      >
        {error ? "🔴" : "🟢"}
      </span>
    </div>
  );
}
