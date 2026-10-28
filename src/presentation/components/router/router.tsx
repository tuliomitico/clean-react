import { SurveyList } from "@/presentation/pages";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type Factory = {
  makeLogin: () => React.JSX.Element;
  makeSignUp: () => React.JSX.Element;
  makeSurveyList: () => React.JSX.Element;
};

export function Router(factory: Factory): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={factory.makeLogin()} />
        <Route path="/signup" element={factory.makeSignUp()} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
}
