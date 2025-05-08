import TextEditorDisplayer, { BlockMode } from "@/app/components/TextEditorDisplayer";
import { useContext } from "react";
import { ListContext } from "@/app/components/List";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function PyramidList({ height }: { height: number }) {
  const { items, colors, editable, handleItemChange, handleDeleteItem, handleAddItem } = useContext(ListContext);
  const n = items.length;
  const segmentColors = items.map((_, i) => colors[i % colors.length]);
  // SVG and pyramid-specific logic
  const svgWidth = height * 1.5;
  const svgHeight = height * .8;
  const segmentHeight = svgHeight / n;
  const baseWidth = svgWidth / 2;
  const spacing = segmentHeight / 20;
  const padding = height / 10;

  const segments = items.map((item, i) => {
    const y1 = svgHeight - (i * segmentHeight) + padding;
    const y2 = y1 - segmentHeight + spacing;
    const w1 = baseWidth * (1 - i / n);
    const w2 = baseWidth * (1 - (i + 1) / n) + (spacing) * (1 - i / n);
    const x1 = (svgWidth - w1) / 2;
    const x2 = (svgWidth - w2) / 2;
    const points = [
      [x1, y1],
      [x1 + w1, y1],
      [x2 + w2, y2],
      [x2, y2],
    ];
    const pointsStr = points.map(p => p.join(",")).join(" ");
    // Label position
    const labelX = svgWidth / 2;
    const labelY = (y1 + y2) / 2;
    return (
      <g key={i}>
        <polygon points={pointsStr} fill={segmentColors[i]} />
        <text
          x={labelX}
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
          x={labelX + 30 + w2 / 2}
          y={labelY - 30}
          width={baseWidth / 2}
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