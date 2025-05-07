import TextEditorDisplayer, { BlockMode } from "@/app/components/TextEditorDisplayer";
import { useContext } from "react";
import { ListContext } from "@/app/components/List";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function ArrowList({ height }: { height: number }) {
  const { items, colors, editable, handleItemChange, handleDeleteItem, handleAddItem } = useContext(ListContext);
  const n = items.length;
  const segmentColors = items.map((_, i) => colors[i % colors.length]);
  const svgWidth = height * 4;
  const arrowWidth = height / 10;
  const overlap = height / 15;
  const totalOverlap = (n - 1) * overlap;
  const segmentWidth = (svgWidth + totalOverlap) / n;

  const segments = items.map((item, i) => {
    const x1 = i * (segmentWidth - overlap);
    const x2 = x1 + segmentWidth;
    const y1 = height * .7, y2 = height;
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
          {i + 1}
        </text>
        <foreignObject
          x={x1}
          y={labelY - 70}
          width={segmentWidth - 2 * overlap}
          height={40}
          style={{ overflow: "visible" }}
          fontSize={16}
        >
          <div className="relative w-full h-full flex justify-center items-center group">
            <TextEditorDisplayer
              value={item}
              onChange={val => handleItemChange?.(i, val)}
              mode={editable ? BlockMode.EDIT : BlockMode.VIEW}
              className={`rounded px-2 py-1 h-full bg-white/50 ${editable ? "border border-dashed border-gray-200" : ""}`}
            />
            {editable && (
              <>
                <Button
                  variant="outline"
                  className={
                    `absolute -top-10 -right-4 opacity-0 group-focus-within:opacity-100
                    transition-opacity bg-white rounded-full aspect-square p-1
                    border border-gray-200 shadow`
                  }
                  onClick={() => {
                    handleDeleteItem(i);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                  tabIndex={-1}
                  aria-label="Delete item"
                >
                  <Trash2 size={16} className="text-red-700" />
                </Button>
                <Button
                  variant="outline"
                  className={
                    `absolute top-1/2 -translate-y-1/2 -right-4 opacity-0 group-focus-within:opacity-100
                    transition-opacity bg-white rounded-full aspect-square p-1
                    border border-gray-200 shadow`
                  }
                  onClick={() => {
                    handleAddItem(i);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  <Plus size={16} className="-m-4" />
                </Button>
              </>
            )}
          </div>
        </foreignObject>
      </g>
    );
  });
  return <>{segments}</>;
}