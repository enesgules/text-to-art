"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { FONTS } from "@/lib/fonts";

const MAX_CHARS = 100;

interface TextDisplayProps {
  text: string;
  onTextChange: (text: string) => void;
}

export function TextDisplay({ text, onTextChange }: TextDisplayProps) {
  const { font, fontSize, textStyle } = useCanvasStore();

  const fontConfig = FONTS.find((f) => f.value === font);
  const fontFamily = fontConfig?.cssVar || "sans-serif";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      onTextChange(value);
    }
  };

  const lineCount = text.split("\n").length;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <textarea
        value={text}
        onChange={handleChange}
        rows={lineCount}
        className="bg-transparent border-none outline-none text-center text-white pointer-events-auto resize-none"
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight: textStyle.bold ? "bold" : "normal",
          fontStyle: textStyle.italic ? "italic" : "normal",
          textDecoration: textStyle.underline ? "underline" : "none",
          lineHeight: 1.2,
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "auto",
          minWidth: "200px",
        }}
        placeholder="Type here..."
      />
    </div>
  );
}
