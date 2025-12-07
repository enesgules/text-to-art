"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { COLOR_PRESETS } from "@/lib/constants";

export function ColorControls() {
  const { primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor } =
    useCanvasStore();

  const applyPreset = (preset: (typeof COLOR_PRESETS)[number]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
  };

  return (
    <div className="space-y-3">
      {/* Presets */}
      <div className="grid grid-cols-4 gap-1.5">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="group relative h-6 rounded overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
            title={preset.name}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.secondary} 50%)`,
              }}
            />
          </button>
        ))}
      </div>

      {/* Custom colors */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-white/60 text-xs uppercase">
            {primaryColor.slice(1)}
          </span>
        </div>
        <div className="flex-1 flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-white/60 text-xs uppercase">
            {secondaryColor.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
