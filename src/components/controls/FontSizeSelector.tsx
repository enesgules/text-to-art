"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { FONT_SIZES } from "@/lib/constants";

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useCanvasStore();

  return (
    <div className="flex gap-1">
      {FONT_SIZES.map((size) => (
        <button
          key={size.value}
          onClick={() => setFontSize(size.value)}
          className={`flex-1 h-8 text-xs rounded transition-colors ${
            fontSize === size.value
              ? "bg-white text-black"
              : "text-white/60 hover:text-white border border-white/20 hover:border-white/40"
          }`}
        >
          {size.name}
        </button>
      ))}
    </div>
  );
}
