import React from 'react';

export interface WheelFactors {
  economic: number; // 0-100
  political: number; // 0-100
  infrastructure: number; // 0-100
  social: number; // 0-100
  environmental: number; // 0-100
}

interface BalanceWheelProps {
  factors: WheelFactors;
  size?: number; // svg width/height
  levels?: number; // grid rings count
  color?: string; // primary color for fill/stroke
  bgColor?: string; // grid color
}

const DEFAULT_COLOR = '#9B823F';

const labelMap: Record<keyof WheelFactors, string> = {
  economic: 'İqtisadi',
  political: 'Siyasi',
  infrastructure: 'İnfrastruktur',
  social: 'Sosial',
  environmental: 'Ekoloji',
};

const BalanceWheel: React.FC<BalanceWheelProps> = ({
  factors,
  size = 360,
  levels = 4,
  color = DEFAULT_COLOR,
  bgColor = '#E5E7EB',
}) => {
  const entries = Object.entries(factors) as [keyof WheelFactors, number][];
  const n = entries.length; // 5
  const cx = size / 2;
  const cy = size / 2;
  const padding = 32;
  const radius = (size / 2) - padding;

  const angleForIndex = (i: number) => {
    // start at -90deg (top) and go clockwise
    const start = -Math.PI / 2;
    return start + (i * 2 * Math.PI) / n;
  };

  const pointFor = (i: number, value01: number) => {
    const a = angleForIndex(i);
    const r = radius * value01;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return [x, y] as const;
  };

  const polygonPoints = entries
    .map(([, v], i) => pointFor(i, Math.max(0, Math.min(1, v / 100))))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {/* Grid levels as polygons */}
      {[...Array(levels)].map((_, li) => {
        const levelRatio = (li + 1) / levels;
        const pts = entries
          .map((_e, i) => pointFor(i, levelRatio))
          .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
          .join(' ');
        return (
          <polygon
            key={`grid-${li}`}
            points={pts}
            fill="none"
            stroke={bgColor}
            strokeWidth={1}
          />
        );
      })}

      {/* Axes */}
      {entries.map((_e, i) => {
        const [x, y] = pointFor(i, 1);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={bgColor}
            strokeWidth={1}
          />
        );
      })}

      {/* Value polygon */}
      <polygon
        points={polygonPoints}
        fill={`${color}33`}
        stroke={color}
        strokeWidth={2}
      />

      {/* Dots */}
      {entries.map(([, v], i) => {
        const [x, y] = pointFor(i, Math.max(0, Math.min(1, v / 100)));
        return (
          <circle key={`dot-${i}`} cx={x} cy={y} r={4} fill={color} />
        );
      })}

      {/* Labels */}
      {entries.map(([key, v], i) => {
        const [lx, ly] = pointFor(i, 1.08);
        return (
          <g key={`label-${key}`}>
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="#374151">
              {labelMap[key]}
            </text>
            <text x={lx} y={ly + 14} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill={color} fontWeight={700}>
              {v}/100
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BalanceWheel;
