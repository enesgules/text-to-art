"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { FONTS } from "@/lib/fonts";

interface TextDisplayProps {
  text: string;
  onTextChange: (text: string) => void;
}

export function TextDisplay({ text, onTextChange }: TextDisplayProps) {
  const { font, fontSize, textStyle } = useCanvasStore();

  const fontConfig = FONTS.find((f) => f.value === font);
  const fontFamily = fontConfig?.cssVar || "sans-serif";

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="bg-transparent border-none outline-none text-center text-white pointer-events-auto max-w-[90vw]"
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight: textStyle.bold ? "bold" : "normal",
          fontStyle: textStyle.italic ? "italic" : "normal",
          textDecoration: textStyle.underline ? "underline" : "none",
        }}
        placeholder="Type here..."
      />
    </div>
  );
}
