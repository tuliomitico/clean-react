import React, { memo } from "react";
import Styles from "./footer.module.scss";

function FooterComponent(): React.JSX.Element {
  return <footer className={Styles.footer} />;
}

export const Footer = memo(FooterComponent);
