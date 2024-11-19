import { TextareaAutosize } from "@mui/material";
import { useEffect, useRef } from "react";
import { cn } from "./utils";

export function TextAreaEditor({
  value,
  onValueChange,
  placeholder,
  className,
  style,
  autoFocus = false,
  ...otherProps
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: Record<string, string>;
  autoFocus?: boolean;
} & React.HTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectionRef = useRef<{
    start: number;
    end: number;
  } | null>(null);

  if (textareaRef.current) {
    const { selectionStart, selectionEnd } = textareaRef.current;

    selectionRef.current = {
      start: selectionStart,
      end: selectionEnd,
    };
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(
        selectionRef.current?.start || 0,
        selectionRef.current?.end || 0
      );
    }
  }, [selectionRef.current]);

  // bring focus to the end of the text based on autoFocus prop
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [autoFocus]);

  return (
    <TextareaAutosize
      ref={textareaRef}
      className={cn(
        "m-0 block w-full max-w-full resize-none border-none bg-transparent p-0 text-inherit outline-none placeholder:text-inherit placeholder:opacity-50",
        className
      )}
      style={style}
      {...otherProps}
      minRows={1}
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value)}
      value={value || ""}
    />
  );
}
