import TextEditorDisplayer, { BlockMode } from "@/app/components/TextEditorDisplayer";
import { useContext } from "react";
import { ListContext } from "@/app/components/List";
import { Trash2 } from "lucide-react";

export default function ArrowList() {
  const { items, colors, handleItemChange, handleDeleteItem, editable } = useContext(ListContext);
  const n = items.length;
  const segmentColors = items.map((_, i) => colors[i % colors.length]);
  const svgWidth = 400;
  const svgHeight = 80;
  const arrowWidth = 16;
  const overlap = 8;
  const totalOverlap = (n - 1) * overlap;
  const segmentWidth = (svgWidth + totalOverlap) / n;

  const segments = items.map((item, i) => {
    const x1 = i * (segmentWidth - overlap);
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
          x={x1}
          y={labelY - 70}
          width={segmentWidth - 2 * overlap}
          height={40}
          style={{ overflow: "visible" }}
          fontSize={8}
        >
          <div className="w-full h-full flex items-end justify-center relative group">
            <TextEditorDisplayer
              value={item}
              onChange={val => handleItemChange?.(i, val)}
              mode={editable ? BlockMode.EDIT : BlockMode.VIEW}
              className={`rounded px-2 py-1 ${editable ? "border border-dashed border-gray-200" : ""}`}
            />
            {editable && (
              <button
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 border border-gray-200 shadow"
                onClick={() => handleDeleteItem(i)}
                tabIndex={-1}
                type="button"
                aria-label="Delete item"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            )}
          </div>
        </foreignObject>
        <text
          x={labelX + overlap}
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