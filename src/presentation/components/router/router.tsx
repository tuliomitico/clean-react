import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/presentation/pages";
import "@/presentation/styles/global.scss";

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
