import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

// Optimización: usar Suspense para lazy loading
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <React.Suspense fallback={<div></div>}>
                <App />
                <Toaster position="top-right" reverseOrder={false} />
            </React.Suspense>
        </React.StrictMode>
    );
}