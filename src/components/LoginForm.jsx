import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ brewing, onEngage, onDisengage, onValidSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email)) e.email = "That email doesn't look right.";
    if (!password) e.password = "Enter your password.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (brewing) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onValidSubmit();
  };

  return (
    <form
      className="form"
      noValidate
      onSubmit={submit}
      onFocus={onEngage}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onDisengage();
      }}
    >
      <h2 className="card-title">Sign in</h2>
      <p className="card-sub">Pull up a chair. Your table is waiting.</p>

      <div className="field">
        <label htmlFor="email">Email</label>
        <div className={`control ${errors.email ? "has-error" : ""}`}>
          <Mail size={18} aria-hidden="true" />
          <input
            id="email" type="email" autoComplete="email" placeholder="you@example.com"
            value={email} disabled={brewing}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email} aria-describedby="email-err"
          />
        </div>
        <p id="email-err" className="error" role="alert">{errors.email}</p>
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <div className={`control ${errors.password ? "has-error" : ""}`}>
          <Lock size={18} aria-hidden="true" />
          <input
            id="password" type={show ? "text" : "password"} autoComplete="current-password"
            placeholder="Enter your password" value={password} disabled={brewing}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password} aria-describedby="password-err"
          />
          <button type="button" className="icon-btn" onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"} disabled={brewing}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p id="password-err" className="error" role="alert">{errors.password}</p>
      </div>

      <div className="row">
        <label className="check">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <span className="box" aria-hidden="true" />
          Remember me
        </label>
        <a href="#" className="link" onClick={(e) => e.preventDefault()}>Forgot password?</a>
      </div>

      <button type="submit" className="btn" disabled={brewing} aria-busy={brewing}>
        {brewing ? (<><Loader2 size={18} className="spin" aria-hidden="true" /> Brewing…</>) : "Sign in"}
      </button>
      <p className="status" role="status">{brewing ? "Brewing your welcome..." : ""}</p>

      <p className="alt">
        New here? <a href="#" className="link" onClick={(e) => e.preventDefault()}>Create an account</a>
      </p>
    </form>
  );
}
