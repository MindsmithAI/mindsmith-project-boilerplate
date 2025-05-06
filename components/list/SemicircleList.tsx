import { useContext } from "react";
import { ListContext } from "@/app/components/List";

export default function SemicircleList() {
  const { items, colors, handleItemChange, editable } = useContext(ListContext);
  const n = (items).length;
  const segmentColors = (items ?? items).map((_, i) => colors[i % colors.length]);

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
    <>
      {segments}
    </>
  );
}