import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
import "./index.css";
import { FileDataProvider } from "./context/file_data_context.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FileDataProvider>
      <App />
    </FileDataProvider>
  </React.StrictMode>
);
