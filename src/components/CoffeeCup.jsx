// level: 0 (empty) → 1 (full). pouring: shows the coffee stream.
export default function CoffeeCup({ pulse = 0, level = 1, pouring = false }) {
  // The coffee surface grows and rises as the level goes up.
  const rx = 52 + 37 * level;
  const ry = 7 + 8.5 * level;
  const cy = 113 - 9 * level;
  const hasCoffee = level > 0.02;

  return (
    <svg className="cup" viewBox="0 0 360 280" role="img" aria-label="A cup of coffee">
      <defs>
        <linearGradient id="porcelain" x1="0" x2="1">
          <stop offset="0" stopColor="#FFFDF8" />
          <stop offset=".65" stopColor="#FBF6EC" />
          <stop offset="1" stopColor="#E9DDC8" />
        </linearGradient>
        <radialGradient id="coffee" cx=".4" cy=".4" r=".8">
          <stop offset="0" stopColor="#6B3F25" />
          <stop offset="1" stopColor="#2B1A12" />
        </radialGradient>
        <linearGradient id="streamGrad" gradientUnits="userSpaceOnUse" x1="0" y1="-170" x2="0" y2="-70">
          <stop offset="0" stopColor="#3a2217" stopOpacity="0" />
          <stop offset="1" stopColor="#3a2217" stopOpacity="1" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="252" rx="140" ry="15" fill="#2B1A12" opacity=".14" />
      <ellipse cx="180" cy="236" rx="138" ry="26" fill="#EADFCB" />
      <ellipse cx="180" cy="232" rx="102" ry="16" fill="#DCCBB0" />

      <g className="cup-body">
        <path d="M262 124 C322 114 322 196 256 192" fill="none" stroke="#E4D5BE" strokeWidth="18" strokeLinecap="round" />
        <path d="M262 124 C322 114 322 196 256 192" fill="none" stroke="url(#porcelain)" strokeWidth="13" strokeLinecap="round" />
        <path d="M80 102 H280 C280 192 250 236 180 236 C110 236 80 192 80 102 Z" fill="url(#porcelain)" />
        <ellipse cx="180" cy="102" rx="100" ry="20" fill="#FBF6EC" stroke="#E4D5BE" />
        {/* inside wall of the cup (visible when it is empty) */}
        <ellipse cx="180" cy="104" rx="89" ry="15.5" fill="#D9C9AE" />

        {hasCoffee && (
          <g>
            <ellipse cx="180" cy={cy} rx={rx} ry={ry} fill="url(#coffee)" />
            <ellipse className="crema" cx="180" cy={cy} rx={rx * 0.79} ry={ry * 0.71} fill="none" stroke="#9A6034" strokeWidth="1.2" opacity=".5" />
            <ellipse className="ripple r1" cx="180" cy={cy} rx={rx * 0.9} ry={ry * 0.8} />
            <ellipse className="ripple r2" cx="180" cy={cy} rx={rx * 0.9} ry={ry * 0.8} />
            <ellipse key={pulse} className={`ripple shot ${pulse ? "go" : ""}`} cx="180" cy={cy} rx={rx * 0.9} ry={ry * 0.8} />
            <ellipse cx="148" cy={cy - 4} rx={rx * 0.25} ry="3" fill="#fff" opacity=".12" />
          </g>
        )}
      </g>

      {/* coffee stream, only visible while pouring */}
      <g className={`stream ${pouring && level < 1 ? "on" : ""}`}>
        <path d={`M180 -170 V${cy}`} stroke="url(#streamGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path className="stream-flow" d={`M179 -120 V${cy}`} stroke="#fff" strokeWidth="1.4" strokeDasharray="10 14" opacity=".22" fill="none" />
      </g>
    </svg>
  );
}
