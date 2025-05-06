import React from "react";
import ArrowList from "@/components/list/ArrowList";
import SemicircleList from "@/components/list/SemicircleList";

interface ListProps {
  items: string[];
  variant?: "semicircle" | "arrow" | "circle" | "funnel" | "pyramid";
  colors?: string[]; // Optional: custom color palette
  width?: number | string;
  height?: number | string;
}

const DEFAULT_COLORS = [
  "#FF5F6D", "#FFC371", "#47EFA6", "#3CA9E2", "#845EC2", "#F9F871", "#FF9671", "#00C9A7"
];

export default function List({
  items,
  variant = "arrow",
  colors = DEFAULT_COLORS,
  width = "100%",
  height = 300,
}: ListProps) {
  function getListComponent() {
    switch(variant) {
      case "arrow":
        return (<ArrowList items={items} colors={colors} />)
      case "semicircle":
        return (<SemicircleList items={items} colors={colors} />)
    }
  }

  return (
    <svg
      viewBox={`0 0 400 200`}
      width={width}
      height={height}
      style={{ display: "block", maxWidth: "100%" }}
    >
      {getListComponent()}
    </svg>
  );
}