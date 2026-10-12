import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import CoffeeScene from "./components/CoffeeScene.jsx";
import LoginForm from "./components/LoginForm.jsx";
import WelcomeState from "./components/WelcomeState.jsx";
import Footer from "./components/Footer.jsx";

// Phases: "intro" → "idle" ⇄ "typing" → "brewing" → "welcome"
const BREW_MS = 2200; // ← brewing duration

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [introGone, setIntroGone] = useState(false); // unmount overlay after it fades
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (phase !== "brewing") return;
    const id = setTimeout(() => setPhase("welcome"), BREW_MS);
    return () => clearTimeout(id);
  }, [phase]);

  const reveal = useCallback(() => setPhase((p) => (p === "intro" ? "idle" : p)), []);
  const introExited = useCallback(() => setIntroGone(true), []);
  const engage = useCallback(() => {
    setPulse((p) => p + 1);
    setPhase((p) => (p === "idle" ? "typing" : p));
  }, []);
  const disengage = useCallback(() => setPhase((p) => (p === "typing" ? "idle" : p)), []);

  return (
    <div className="page" data-phase={phase}>
      <Header />
      <main className="stage">
        {phase !== "intro" && (
          <>
            <CoffeeScene phase={phase} pulse={pulse} />
            <section className="card" aria-live="polite">
              {phase === "welcome" ? (
                <WelcomeState onReset={() => setPhase("idle")} />
              ) : (
                <LoginForm
                  brewing={phase === "brewing"}
                  onEngage={engage}
                  onDisengage={disengage}
                  onValidSubmit={() => setPhase("brewing")}
                />
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
      {!introGone && <Intro onReveal={reveal} onExited={introExited} />}
    </div>
  );
}
