import React, { type PropsWithoutRef, useContext } from "react";
import Context from "@/presentation/contexts/form/form-context";

type Props = {
  text: string;
};

export function SubmitButton({
  text,
}: PropsWithoutRef<Props>): React.JSX.Element {
  const { state } = useContext(Context) as {
    state: {
      isLoading: boolean;
      isFormInvalid: boolean;
      email: string;
      password: string;
      emailError: string;
      passwordError: string;
      mainError: string;
    };
    setState: React.Dispatch<
      React.SetStateAction<{
        isLoading: boolean;
        isFormInvalid: boolean;
        email: string;
        password: string;
        emailError: string;
        passwordError: string;
        mainError: string;
      }>
    >;
  };

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
      {text}
    </button>
  );
}
