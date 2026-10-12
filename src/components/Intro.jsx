import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import CoffeeCup from "./CoffeeCup.jsx";
import Steam from "./Steam.jsx";

const FILL_SECONDS = 3; // ← how long the user must hold to fill the cup

export default function Intro({ onReveal, onExited }) {
  const [level, setLevel] = useState(0); // 0 (empty) → 1 (full)
  const [pouring, setPouring] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const full = level >= 1;
  const pct = Math.round(level * 100);

  // While holding: raise the coffee level every animation frame.
  useEffect(() => {
    if (!pouring) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setLevel((l) => Math.min(1, l + dt / FILL_SECONDS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pouring]);

  // Cup is full: let the steam bloom, then reveal the login page.
  useEffect(() => {
    if (!full) return;
    setPouring(false);
    const a = setTimeout(() => { setLeaving(true); onReveal(); }, 1000);
    const b = setTimeout(onExited, 2200);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [full, onReveal, onExited]);

  const start = () => { if (!full) setPouring(true); };
  const stop = () => setPouring(false);

  const label = full
    ? "Perfect."
    : pouring
    ? `Pouring… ${pct}%`
    : level > 0
    ? `Keep holding · ${pct}%`
    : "Hold to pour";

  return (
    <section className={`intro ${leaving ? "leaving" : ""}`} aria-label="Pour your coffee">
      <div className="intro-top">
        <span className="brand mono"><Coffee size={16} aria-hidden="true" /> BEAN &amp; BREW</span>
        {!full && <button type="button" className="skip" onClick={() => setLevel(1)}>Skip intro</button>}
      </div>

      <div className="intro-stage">
        <div
          className="cup-wrap"
          data-phase={pouring ? "pour" : "idle"}
          style={{ "--steam": 0.75 * level }}
          aria-hidden="true"
        >
          <Steam />
          <CoffeeCup level={level} pouring={pouring} />
        </div>
      </div>

      <h2 className="intro-title">{full ? "Enjoy the first sip." : "Pour yourself a cup."}</h2>
      <p className="intro-hint">Press and hold the button to pour. Your table opens when the cup is full.</p>

      <button
        type="button"
        className="pour-btn"
        disabled={full}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); start(); }}
        onPointerUp={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); }
        }}
        onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") stop(); }}
        onBlur={stop}
      >
        <span className="pour-fill" style={{ width: `${pct}%` }} aria-hidden="true" />
        <span className="pour-label">{label}</span>
      </button>
    </section>
  );
}
