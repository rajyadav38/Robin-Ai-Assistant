export default function Hud() {
  return (
    <div className="hud-svg">
      <svg viewBox="0 0 400 400" className="hud-main">
        {/* Outer glow ring */}
        <circle cx="200" cy="200" r="170" className="ring glow" />

        {/* Rotating segmented ring */}
        <circle cx="200" cy="200" r="140" className="ring segmented" />

        {/* Inner rotating ring opposite direction */}
        <circle cx="200" cy="200" r="100" className="ring reverse" />

        {/* Radar sweep */}
        <line x1="200" y1="40" x2="200" y2="360" className="scan" />

        {/* Core pulse */}
        <circle cx="200" cy="200" r="35" className="core" />
      </svg>
    </div>
  );
}
