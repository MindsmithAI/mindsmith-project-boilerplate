import React from "react";

interface ListProps {
  items: string[];
  variant?: "semicircle" | "arrows";
  colors?: string[]; // Optional: custom color palette
  width?: number | string;
  height?: number | string;
}

const DEFAULT_COLORS = [
  "#FF5F6D", "#FFC371", "#47EFA6", "#3CA9E2", "#845EC2", "#F9F871", "#FF9671", "#00C9A7"
];

export default function List({
  items,
  variant = "arrows",
  colors = DEFAULT_COLORS,
  width = "100%",
  height = 300,
}: ListProps) {
  const n = items.length;
  const segmentColors = items.map((_, i) => colors[i % colors.length]);

  if (variant === "semicircle") {
    // Semicircle settings
    const cx = 200, cy = 200, rOuter = 180, thickness = 50;
    const rInner = rOuter - thickness;
    const angleStep = Math.PI / n;
    const spacing = 0.01 * Math.PI; // Overlap between segments
    const arrowWidth = .03 * Math.PI // Arrowhead width
    const arrowPoint = (rOuter + rInner) / 2
    const segments = items.map((item, i) => {
      const startAngle = Math.PI + i * angleStep;
      const endAngle = startAngle + angleStep - spacing;
      // Outer arc start/end
      const x1 = cx + rOuter * Math.cos(startAngle);
      const y1 = cy + rOuter * Math.sin(startAngle);
      const x2 = cx + rOuter * Math.cos(endAngle);
      const y2 = cy + rOuter * Math.sin(endAngle);
      // Inner arc start/end
      const x3 = cx + rInner * Math.cos(endAngle);
      const y3 = cy + rInner * Math.sin(endAngle);
      const x4 = cx + rInner * Math.cos(startAngle);
      const y4 = cy + rInner * Math.sin(startAngle);
      // Arrowhead points
      const arrowTipX = cx + arrowPoint * Math.cos(endAngle + arrowWidth);
      const arrowTipY = cy + arrowPoint * Math.sin(endAngle + arrowWidth);
      // Arrowhead negative points
      const arrowTipXNeg = cx + arrowPoint * Math.cos(startAngle + arrowWidth);
      const arrowTipYNeg = cy + arrowPoint * Math.sin(startAngle + arrowWidth);

      // Path for annular sector (curved rectangle)
      const path = [
        `M${x1},${y1}`,
        `A${rOuter},${rOuter} 0 0 1 ${x2},${y2}`,
        `L${arrowTipX},${arrowTipY}`,
        `L${x3},${y3}`,
        `A${rInner},${rInner} 0 0 0 ${x4},${y4}`,
        `L${arrowTipXNeg},${arrowTipYNeg}`,
        "Z"
      ].join(" ");
      // Label position (middle of arc, between radii)
      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = (rOuter + rInner) / 2;
      const lx = cx + labelRadius * Math.cos(midAngle);
      const ly = cy + labelRadius * Math.sin(midAngle);
      return (
        <g key={i}>
          <path d={path} fill={segmentColors[i]} />
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
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
      <svg
        viewBox="0 0 400 240"
        width={width}
        height={height}
        style={{ display: "block", maxWidth: "100%" }}
      >
        {segments}
      </svg>
    );
  }

  // ARROWS VARIANT
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
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width={width}
      height={height}
      style={{ display: "block", maxWidth: "100%" }}
    >
      {segments}
    </svg>
  );
}