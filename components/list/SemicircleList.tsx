import { useContext } from "react";
import { ListContext } from "@/app/components/List";
import TextEditorDisplayer, { BlockMode } from "@/app/components/TextEditorDisplayer";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function SemicircleList({ height }: { height: number }) {
  const { items, colors, editable, handleItemChange, handleDeleteItem, handleAddItem } = useContext(ListContext);
  const n = (items).length;
  const segmentColors = (items ?? items).map((_, i) => colors[i % colors.length]);

  // Semicircle settings
  const cx = height, cy = height * .9, rOuter = height / 1.8, thickness = rOuter / 2.5;
  const rInner = rOuter - thickness;
  const arrowWidthPx = rOuter / 6;
  const arrowPoint = (rOuter + rInner) / 1.96
  const arrowWidth = arrowWidthPx / arrowPoint;
  const arrowPointNeg = (rOuter + rInner) / 1.95
  const angleStep = Math.PI / n;
  const spacing = 4 / rOuter; // Overlap between segments
  const spacingInner = spacing * (rOuter / rInner); // space between inner segments
  const spacingArrow = spacing * ((rOuter / rInner) / 1.5); // space between arrowhead and segment

  // First pass: render segment shapes and numbers
  const shapes = items.map((item, i) => {
    const startAngle = Math.PI + i * angleStep;
    const endAngle = startAngle + angleStep;
    // Outer arc start/end
    const x1 = cx + rOuter * Math.cos(startAngle);
    const y1 = cy + rOuter * Math.sin(startAngle);
    const x2 = cx + rOuter * Math.cos(endAngle - spacing);
    const y2 = cy + rOuter * Math.sin(endAngle - spacing);
    // Inner arc start/end
    const x3 = cx + rInner * Math.cos(endAngle - spacingInner);
    const y3 = cy + rInner * Math.sin(endAngle - spacingInner);
    const x4 = cx + rInner * Math.cos(startAngle);
    const y4 = cy + rInner * Math.sin(startAngle);
    // Arrowhead points
    const arrowTipX = cx + arrowPoint * Math.cos(endAngle + arrowWidth - spacingArrow);
    const arrowTipY = cy + arrowPoint * Math.sin(endAngle + arrowWidth - spacingArrow);
    // Arrowhead negative points
    let arrowTipXNeg = cx + arrowPointNeg * Math.cos(startAngle + arrowWidth);
    let arrowTipYNeg = cy + arrowPointNeg * Math.sin(startAngle + arrowWidth);

    let arrowNegative = [`L${arrowTipXNeg},${arrowTipYNeg}`];
    if (i === 0) {
      // First segment: adjust the start angle to make it even with final segment
      arrowNegative = [
        `L${x4},${y4 + arrowWidthPx / 2}`,
        `L${arrowTipXNeg},${arrowTipYNeg + arrowWidthPx / 2}`,
        `L${x1},${y1 + arrowWidthPx / 2}`,
      ]
    }

    // Path for annular sector (curved rectangle)
    const path = [
      `M${x1},${y1}`,
      `A${rOuter},${rOuter} 0 0 1 ${x2},${y2}`,
      `L${arrowTipX},${arrowTipY}`,
      `L${x3},${y3}`,
      `A${rInner},${rInner} 0 0 0 ${x4},${y4}`,
      ...arrowNegative,
      "Z"
    ].join(" ");
    // Label position (middle of arc, between radii)
    const midAngle = (startAngle + arrowWidth + endAngle) / 2;
    const labelRadius = (rOuter + rInner) / 2;
    const lx = cx + labelRadius * Math.cos(midAngle);
    const ly = cy + labelRadius * Math.sin(midAngle);
    return (
      <g key={i + '-shape'}>
        <path d={path} fill={segmentColors[i]} />
        <text
          x={lx}
          y={ly}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={16}
          fontWeight={600}
          fill="#fff"
        >
          {i + 1}
        </text>
      </g>
    );
  });

  // Second pass: render foreignObjects (on top)
  const foreignObjects = items.map((item, i) => {
    const startAngle = Math.PI + i * angleStep;
    const endAngle = startAngle + angleStep;
    const textRadius = (rOuter + 30);
    const midAngle = (startAngle + arrowWidth + endAngle) / 2;
    const textX = cx + textRadius * Math.cos(midAngle);
    const textY = cy + textRadius * Math.sin(midAngle);
    return (
      <foreignObject
        key={i + '-fo'}
        x={textX - 100}
        y={textY - 30}
        width={200}
        height={100}
        fontSize={16}
        className="overflow-visible z-20"
      >
        <div className="w-full h-full flex justify-center relative group">
          <TextEditorDisplayer
            value={item}
            onChange={val => handleItemChange?.(i, val)}
            mode={editable ? BlockMode.EDIT : BlockMode.VIEW}
            className={`rounded px-2 py-1 bg-white/50 ${editable ? "border border-dashed border-gray-200" : ""}`}
          />
          {editable && (
            <>
              <Button
                variant="outline"
                className={
                  `absolute -top-6 -left-6 opacity-0 group-focus-within:opacity-100
                  transition-opacity bg-white rounded-full aspect-square p-1
                  border border-gray-200 shadow`
                }
                onClick={() => {
                  handleDeleteItem(i);
                }}
                tabIndex={-1}
                aria-label="Delete item"
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
              <Button
                variant="outline"
                className={
                  `absolute -top-6 -right-6 opacity-0 group-focus-within:opacity-100
                  transition-opacity bg-white rounded-full aspect-square p-1
                  border border-gray-200 shadow`
                }
                onClick={() => {
                  handleAddItem(i);
                }}
              >
                <Plus size={16} className="-m-4" />
              </Button>
            </>
          )}
        </div>
      </foreignObject>
    );
  });

  return (
    <>
      {shapes}
      {foreignObjects}
    </>
  );
}