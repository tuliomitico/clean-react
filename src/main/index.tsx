import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const main = document.getElementById("main");

main !== null &&
  createRoot(main).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
