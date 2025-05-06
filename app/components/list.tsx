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
  handleListChange?: (items: string[]) => void;
}

const DEFAULT_COLORS = [
  "#4582C3",
];

export default function List({ items, editable = false, colors = DEFAULT_COLORS, variant = "arrow", ...props }: ListProps) {
  const handleItemChange = (index: number, value: string) => {
    const updatedItems = items.map((item, i) => (i === index ? value : item))
    if (props.handleListChange) {
      props.handleListChange(updatedItems);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    if (props.handleListChange) {
      props.handleListChange(updatedItems);
    }
  };

  const componentMap = { arrow: ArrowList, circle: CircleList, semicircle: SemicircleList, funnel: FunnelList, pyramid: PyramidList };
  const VariantComponent = componentMap[variant];

  return (
    <div className="w-full aspect-[4/1]">
      <ListContext.Provider value={{ items, editable, colors, handleItemChange, handleDeleteItem }}>
        <svg width="100%" height={props.height} viewBox={`0 0 400 100`}>
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
  editable: boolean;
  colors: string[];
  handleItemChange: (index: number, value: string) => void;
  handleDeleteItem: (index: number) => void;
}

export const ListContext = createContext<ListContextType>({
  items: [],
  editable: false,
  colors: [],
  handleItemChange: () => { },
  handleDeleteItem: () => { }
});