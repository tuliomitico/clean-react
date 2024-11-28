import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Login } from "@/presentation/pages";

const main = document.getElementById("main");

main !== null &&
  createRoot(main).render(
    <StrictMode>
      <Login />
    </StrictMode>,
  );
