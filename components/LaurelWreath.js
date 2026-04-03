const LEAF_POSITIONS = [
  { x: 33, y: 102, rotate: -64, scale: 1.02 },
  { x: 41, y: 88, rotate: -51, scale: 1.01 },
  { x: 49, y: 74, rotate: -37, scale: 0.99 },
  { x: 57, y: 60, rotate: -22, scale: 0.96 },
  { x: 63, y: 45, rotate: -8, scale: 0.92 },
  { x: 68, y: 31, rotate: 7, scale: 0.88 },
];

function Leaf({ x, y, rotate, scale }) {
  return (
    <path
      d="M0 0C4.6-8.8 4.2-18.4 0-28C-4.2-18.4-4.6-8.8 0 0Z"
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      fill="currentColor"
      opacity="0.96"
    />
  );
}

export default function LaurelWreath({ side = "left", className = "" }) {
  const isRight = side === "right";

  return (
    <svg
      viewBox="0 0 120 140"
      aria-hidden="true"
      className={`laurel-wreath h-7 w-7 text-slate-300 ${className}`.trim()}
      fill="none"
    >
      <g transform={isRight ? "translate(120 0) scale(-1 1)" : undefined}>
        <path
          d="M31 112C33 94 41 73 55 53C63 41 71 31 82 22"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.82"
        />
        {LEAF_POSITIONS.map((leaf, index) => (
          <Leaf key={index} {...leaf} />
        ))}
      </g>
    </svg>
  );
}
