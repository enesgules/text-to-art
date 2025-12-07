"use client";

import { useCanvasStore } from "@/store/canvas-store";

export function ColorControls() {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useCanvasStore();

  return (
    <div className="flex gap-2">
      <div className="flex-1 flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
        />
        <span className="text-white/60 text-xs uppercase">{primaryColor.slice(1)}</span>
      </div>
      <div className="flex-1 flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
        />
        <span className="text-white/60 text-xs uppercase">{secondaryColor.slice(1)}</span>
      </div>
    </div>
  );
}
