import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "@/presentation/components";
import "@/presentation/styles/global.scss";

const main = document.getElementById("main");

main !== null &&
  createRoot(main).render(
    <StrictMode>
      <Router />
    </StrictMode>,
  );
