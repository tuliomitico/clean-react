import { SignUp } from "@/presentation/pages";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type Props = {
  makeLogin: () => React.JSX.Element;
};

export function Router({ makeLogin }: Props): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={makeLogin()} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
