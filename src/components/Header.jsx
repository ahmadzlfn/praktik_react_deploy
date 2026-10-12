import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

const fmt = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function Header() {
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="brand mono">
        <Coffee size={16} aria-hidden="true" /> BEAN &amp; BREW
      </div>
      <time className="mono">{time}</time>
    </header>
  );
}
