"use client";

import { useCanvasStore } from "@/store/canvas-store";

export function TextStyleToggles() {
  const { textStyle, setBold, setItalic, setUnderline } = useCanvasStore();

  const toggles = [
    { key: "bold", label: "B", active: textStyle.bold, toggle: setBold, className: "font-bold" },
    { key: "italic", label: "I", active: textStyle.italic, toggle: setItalic, className: "italic" },
    { key: "underline", label: "U", active: textStyle.underline, toggle: setUnderline, className: "underline" },
  ];

  return (
    <div className="flex gap-1">
      {toggles.map((t) => (
        <button
          key={t.key}
          onClick={() => t.toggle(!t.active)}
          className={`flex-1 h-8 text-xs rounded transition-colors ${t.className} ${
            t.active
              ? "bg-white text-black"
              : "text-white/60 hover:text-white border border-white/20 hover:border-white/40"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
