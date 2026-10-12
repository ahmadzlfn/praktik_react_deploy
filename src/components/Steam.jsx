// Each wisp is a blurred, rising, widening column. Intensity comes from the
// --steam CSS variable, which changes with the scene phase.
const WISPS = [
  { left: 38, delay: 0, dur: 6.5, drift: -18 },
  { left: 46, delay: 1.8, dur: 7.5, drift: 14 },
  { left: 54, delay: 3.2, dur: 6.8, drift: -10 },
  { left: 61, delay: 0.9, dur: 8, drift: 20 },
  { left: 50, delay: 4.6, dur: 7, drift: -22 },
];

export default function Steam() {
  return (
    <div className="steam">
      {WISPS.map((w, i) => (
        <span
          key={i}
          className="wisp"
          style={{
            left: `${w.left}%`,
            animationDelay: `${w.delay}s`,
            "--dur": `${w.dur}s`,
            "--drift": `${w.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
