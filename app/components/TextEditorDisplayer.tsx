import { cn } from "@/lib/utils";
import { TextAreaEditor } from "./Editor";

export enum BlockMode {
  EDIT,
  THUMBNAIL,
  VIEW,
  DRAG,
  PRINT,
}

export default function TextEditorDisplayer({
  value,
  onChange,
  placeholder,
  className,
  mode,

  disableEnter,
  autoFocus,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  mode: BlockMode;
  disableEnter?: boolean;
  autoFocus?: boolean;
  style?: Record<string, string>;
}) {
  if (mode === BlockMode.EDIT) {
    return (
      <TextAreaEditor
        onKeyDown={(e) => {
          if (disableEnter && e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        className={className}
        style={style}
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        autoFocus={autoFocus}
      />
    );
  }

  // TOOD: remove this hack

  let niceValue = value || "";

  // add a space if it ends in newline
  if (niceValue.endsWith("\n")) {
    niceValue += " ";
  }

  // return JSON.stringify(value);

  return (
    <div className={cn("whitespace-pre-wrap", className || "")}>
      {niceValue}
    </div>
  );
}
