import { memo } from "react";
import { Logo } from "..";
import Styles from "./header.module.scss";

function HeaderComponent() {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Tulio</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
