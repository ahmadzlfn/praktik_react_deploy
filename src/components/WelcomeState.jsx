import { Coffee } from "lucide-react";

export default function WelcomeState({ onReset }) {
  return (
    <div className="welcome">
      <div className="welcome-icon"><Coffee size={26} aria-hidden="true" /></div>
      <h2 className="welcome-title">Welcome back.</h2>
      <p className="card-sub">Your coffee is ready. Take a breath and enjoy your day.</p>
      <button type="button" className="btn btn-ghost" onClick={onReset}>Sign in again</button>
    </div>
  );
}
