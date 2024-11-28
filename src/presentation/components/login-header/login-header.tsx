import React, { memo } from "react";
import Styles from "./login-header.module.scss";
import { Logo } from "../logo/logo";

type Props = React.HTMLAttributes<HTMLElement>;

function LoginHeaderComponent(props: Props): React.JSX.Element {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
}

export const LoginHeader = memo(LoginHeaderComponent);
