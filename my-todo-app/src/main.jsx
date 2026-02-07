import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Registrácia PWA s auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // Vypíše prompt a hneď načíta novú verziu
    if (confirm("Nová verzia appky je pripravená. Chceš ju načítať?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("App je pripravená offline ✅");
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
