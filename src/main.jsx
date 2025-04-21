import { createRoot } from "react-dom/client";
import MyApp from "./App.jsx";
import "./styles/global.css";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((err) => {
            console.error("Error registrando Service Worker:", err);
        });
}

createRoot(document.getElementById("root")).render(<MyApp />);
