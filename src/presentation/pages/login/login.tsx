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
import type { Authentication } from "@/domain/usecases";
import { Link } from "react-router-dom";

type Props = {
  validation?: Validation;
  authentication?: Authentication;
};
export function Login({
  validation,
  authentication,
}: PropsWithoutRef<Props>): React.JSX.Element {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });
  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate("email", state.email) ?? "",
      passwordError: validation?.validate("password", state.password) ?? "",
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication?.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem("accessToken", account?.accessToken ?? "");
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: (error as Error).message,
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}
