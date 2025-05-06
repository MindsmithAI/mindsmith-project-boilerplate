import TextEditorDisplayer, { BlockMode } from "@/app/components/TextEditorDisplayer";
import { useContext } from "react";
import { ListContext } from "@/app/components/List";

export default function PyramidList() {
  const { items, colors, handleItemChange, editable } = useContext(ListContext);
  const n = (items).length;
  const segmentColors = (items ?? items).map((_, i) => colors[i % colors.length]);
  const svgWidth = 400;
  const svgHeight = 80;
  const padding = 24;
  const segmentWidth = (svgWidth - 2 * padding) / n;
  const arrowWidth = 16;
  const spacing = 8; // Overlap between segments
  const segments = (items ?? items).map((item, i) => {
    const x1 = padding + i * (segmentWidth - spacing);
    const x2 = x1 + segmentWidth;
    const y1 = 20, y2 = svgHeight - 20;
    const x2a = x2 - arrowWidth;
    const arrowPoints = [
      [x2a, y1],
      [x2a + arrowWidth, (y1 + y2) / 2],
      [x2a, y2],
    ];
    const arrowPointsNeg = [
      [x1, y2],
      [x1 + arrowWidth, (y1 + y2) / 2],
      [x1, y1],
    ];
    const points = [
      [x1, y1],
      [x2a, y1],
      ...arrowPoints,
      [x2a, y2],
      [x1, y2],
      ...arrowPointsNeg,
    ];
    const pointsStr = points.map(p => p.join(",")).join(" ");
    // Label position
    const labelX = x1 + (x2a - x1) / 2;
    const labelY = (y1 + y2) / 2;
    return (
      <g key={i}>
        <polygon points={pointsStr} fill={segmentColors[i]} />
        <foreignObject
          x={labelX - segmentWidth / 2 + spacing}
          y={labelY - 70}
          width={segmentWidth - 2 * spacing}
          height={40}
          style={{ overflow: "visible" }}
          fontSize={8}
        >
          <div className="w-full h-full flex items-end justify-center">
            <TextEditorDisplayer
              value={item}
              onChange={val => (handleItemChange ?? handleItemChange)?.(i, val)}
              mode={(editable ? BlockMode.EDIT : BlockMode.VIEW)}
              className={`rounded px-2 py-1 ${editable ? "border border-dashed border-gray-200" : ""}`}
            />
          </div>
        </foreignObject>
        <text
          x={labelX + spacing}
          y={labelY}
          alignmentBaseline="middle"
          fontSize={16}
          textAnchor="middle"
          fill="white"
          fontWeight="bold"
          style={{ pointerEvents: "none" }}
        >
          {i}
        </text>
      </g>
    );
  });
  return <>{segments}</>;
}