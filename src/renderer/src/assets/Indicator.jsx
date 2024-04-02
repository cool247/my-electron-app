export default function IndicatorIcon({ height }) {
  const h = (height * 10) / 2

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="25"
      height="75"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 25 75"
    >
      <rect x="4" y="1" width="25" height="75" fill="#aacab0" />
      <rect x="4" y={75 - h} width="25" height={h} fill="#00ff00" />
    </svg>
  )
}
