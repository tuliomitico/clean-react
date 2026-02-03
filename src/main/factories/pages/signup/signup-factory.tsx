import React from "react";
import { SignUp } from "@/presentation/pages";
import { makeRemoteAddAccount } from "@/main/factories/usecases/add-account/remote-add-account-factory";
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUp = (): React.JSX.Element => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
