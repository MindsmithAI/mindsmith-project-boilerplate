interface ArrowListProps {
  items: string[];
  colors: string[];
}

export default function ArrowList({
  items,
  colors
}: ArrowListProps) {
  const n = items.length;
  const segmentColors = items.map((_, i) => colors[i % colors.length]);

  const svgWidth = 400;
  const svgHeight = 80;
  const padding = 24;
  const segmentWidth = (svgWidth - 2 * padding) / n;
  const arrowWidth = 16;
  const spacing = 8; // Overlap between segments
  const segments = items.map((item, i) => {
    const x1 = padding + i * (segmentWidth - spacing);
    const x2 = x1 + segmentWidth;
    const y1 = 20, y2 = svgHeight - 20;

    // Arrow break: cut off arrowWidth at end except last
    const x2a = x2 - arrowWidth;

    // Arrowhead points
    const arrowPoints =
      [
        [x2a, y1],
        [x2a + arrowWidth, (y1 + y2) / 2],
        [x2a, y2]
      ]

    // Arrowhead negative points
    const arrowPointsNeg =
      [
        [x1, y2],
        [x1 + arrowWidth, (y1 + y2) / 2],
        [x1, y1]
      ]


    // Segment polygon
    const points = [
      [x1, y1],
      [x2a, y1],
      [arrowPoints[0], arrowPoints[1], arrowPoints[2]],
      [x2a, y2],
      [x1, y2],
      [arrowPointsNeg[0], arrowPointsNeg[1], arrowPointsNeg[2]]
    ];

    const pointsStr = points.map(p => p.join(",")).join(" ");

    // Label position
    const labelX = x1 + (x2a - x1) / 2;
    const labelY = (y1 + y2) / 2;

    return (
      <g key={i}>
        <polygon points={pointsStr} fill={segmentColors[i]} />
        <text
          x={labelX}
          y={labelY}
          alignmentBaseline="middle"
          fontSize={16}
          fontWeight={600}
          fill="#222"
        >
          {item}
        </text>
      </g>
    );
  });
  return (
    <>
      {segments}
    </>
  );
}