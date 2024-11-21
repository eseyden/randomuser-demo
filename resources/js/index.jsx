/**
 * Index.JSX
 *
 * Laravel + Vite Entrypoint
 */

import "@css/index.css"; // Import tailwindcss

import { StrictMode } from "react"; // Double mount things with strict mode during development.
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
