import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("gaucho-root");

if (container) {
    createRoot(container).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
