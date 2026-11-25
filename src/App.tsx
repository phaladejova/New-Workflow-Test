import { useState } from "react";
import { ButtonPrimary } from "./components/ButtonPrimary/ButtonPrimary";
import "./styles/preview.css";

export function App() {
  const [pressed, setPressed] = useState(0);

  return (
    <main className="preview">
      <ButtonPrimary onClick={() => setPressed((count) => count + 1)} />
      <p className="preview__status">Pressed {pressed} times</p>
    </main>
  );
}
