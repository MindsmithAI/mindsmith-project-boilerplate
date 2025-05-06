"use client";
import { useState } from "react";
import ArrowList from "@/components/list/ArrowList";
import SemicircleList from "@/components/list/SemicircleList";
import CircleList from "@/components/list/CircleList";
import FunnelList from "@/components/list/FunnelList";
import PyramidList from "@/components/list/PyramidList";

interface ListProps {
  items: string[];
  variant?: "semicircle" | "arrow" | "circle" | "funnel" | "pyramid";
  colors?: string[]; // Optional: custom color palette
  width?: number | string;
  height?: number | string;
  editable?: boolean;
}

const DEFAULT_COLORS = [
  "#FF5F6D", "#FFC371", "#47EFA6", "#3CA9E2", "#845EC2", "#F9F871", "#FF9671", "#00C9A7"
];

export default function List({ items: initialItems, editable = false, colors = DEFAULT_COLORS, variant = "arrow", ...props }: ListProps) {
  const [items, setItems] = useState(initialItems);

  const handleItemChange = (index: number, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? value : item)));

  };



  const componentMap = { arrow: ArrowList, circle: CircleList, semicircle: SemicircleList, funnel: FunnelList, pyramid: PyramidList };
  const VariantComponent = componentMap[variant];

  return (
    <div style={{ width: props.width, height: props.height }}>
      <ListContext.Provider value={{ items, handleItemChange, editable, colors }}>
        <svg width="100%" height={props.height} viewBox={`0 0 400 1`}>
          <VariantComponent />
        </svg>
      </ListContext.Provider>
    </div>
  );
}

// Context for list state and updater
import { createContext } from "react";

interface ListContextType {
  items: string[];
  handleItemChange: (index: number, value: string) => void;
  editable: boolean;
  colors: string[];
}

export const ListContext = createContext<ListContextType>({
  items: [],
  handleItemChange: () => { },
  editable: false,
  colors: [],
});