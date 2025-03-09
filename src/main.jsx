import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MyApp from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(<MyApp />);
