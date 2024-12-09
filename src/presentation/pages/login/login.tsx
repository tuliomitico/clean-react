import React, { type PropsWithoutRef, useEffect, useState } from "react";
import Styles from "./login.module.scss";
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";
import type { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation?: Validation;
};
export function Login({
  validation,
}: PropsWithoutRef<Props>): React.JSX.Element {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: "",
  });
  useEffect(() => {
    validation?.validate("email", state.email);
  }, [state.email]);
  useEffect(() => {
    validation?.validate("password", state.password);
  }, [state.password]);
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu melhor e-mail"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}
