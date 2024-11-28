import * as React from "react";
const Logo = (props): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={120} height={87} {...props}>
    <title>{"Group Copy"}</title>
    <g fill="#FFF" fillRule="nonzero">
      <path d="M46.465 0h31.597c25.841 0 41.13 15.712 41.13 43.224 0 27.511-15.229 43.645-41.13 43.645H46.465V0Zm15.468 13.124v60.621h14.51c17.387 0 26.98-10.655 26.98-30.461 0-19.445-9.713-30.16-26.98-30.16h-14.51Z" />
      <path d="M45.141 86.869V70.434H0V57.07C7.837 42.862 17.931 27.39 37.555 0h23.01v57.732h12.162v12.702H60.564V86.87H45.141Zm-30.47-29.197v.421h30.72V11.498h-.25c-14.608 20.348-23.26 33.17-30.47 46.174Z" />
    </g>
  </svg>
);
export { Logo };
