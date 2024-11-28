import React from "react";
import Styles from "./spinner.module.scss";

type Props = React.HTMLAttributes<HTMLElement>;

export function Spinner(props: Props): React.JSX.Element {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(" ")}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
