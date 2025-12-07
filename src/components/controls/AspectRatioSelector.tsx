"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { ASPECT_RATIOS, AspectRatioValue } from "@/lib/constants";

export function AspectRatioSelector() {
  const { aspectRatio, setAspectRatio } = useCanvasStore();

  return (
    <div className="flex gap-1">
      {ASPECT_RATIOS.map((ratio) => (
        <button
          key={ratio.value}
          onClick={() => setAspectRatio(ratio.value as AspectRatioValue)}
          className={`flex-1 h-8 text-xs rounded transition-colors ${
            aspectRatio === ratio.value
              ? "bg-white text-black"
              : "text-white/60 hover:text-white border border-white/20 hover:border-white/40"
          }`}
        >
          {ratio.value}
        </button>
      ))}
    </div>
  );
}
