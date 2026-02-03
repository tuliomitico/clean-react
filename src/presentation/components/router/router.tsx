import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type Factory = {
  makeLogin: () => React.JSX.Element;
  makeSignUp: () => React.JSX.Element;
};

export function Router(factory: Factory): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={factory.makeLogin()} />
        <Route path="/signup" element={factory.makeSignUp()} />
      </Routes>
    </BrowserRouter>
  );
}
