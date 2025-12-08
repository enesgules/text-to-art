"use client";

import { useCanvasStore } from "@/store/canvas-store";
import { COLOR_PRESETS, SHADER_COLOR_COUNTS } from "@/lib/constants";

export function ColorControls() {
  const {
    shaderType,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
    textColor,
    setPrimaryColor,
    setSecondaryColor,
    setTertiaryColor,
    setQuaternaryColor,
    setTextColor,
  } = useCanvasStore();

  const colorCount = SHADER_COLOR_COUNTS[shaderType];

  const applyPreset = (preset: (typeof COLOR_PRESETS)[number]) => {
    setPrimaryColor(preset.colors[0]);
    setSecondaryColor(preset.colors[1]);
    setTertiaryColor(preset.colors[2]);
    setQuaternaryColor(preset.colors[3]);
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
                background: `linear-gradient(135deg, ${preset.colors[0]} 25%, ${preset.colors[1]} 25%, ${preset.colors[1]} 50%, ${preset.colors[2]} 50%, ${preset.colors[2]} 75%, ${preset.colors[3]} 75%)`,
              }}
            />
          </button>
        ))}
      </div>

      {/* Shader colors */}
      <div className="grid grid-cols-2 gap-2">
        <ColorInput
          label="1"
          value={primaryColor}
          onChange={setPrimaryColor}
        />
        <ColorInput
          label="2"
          value={secondaryColor}
          onChange={setSecondaryColor}
        />
        {colorCount >= 3 && (
          <ColorInput
            label="3"
            value={tertiaryColor}
            onChange={setTertiaryColor}
          />
        )}
        {colorCount >= 4 && (
          <ColorInput
            label="4"
            value={quaternaryColor}
            onChange={setQuaternaryColor}
          />
        )}
      </div>

      {/* Text color */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-white/60 text-xs">Text</span>
          <span className="text-white/40 text-xs uppercase ml-auto">
            {textColor.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-2 h-9 px-2 rounded border border-white/20 hover:border-white/40 transition-colors">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
      />
      <span className="text-white/40 text-xs">{label}</span>
      <span className="text-white/60 text-xs uppercase ml-auto">
        {value.slice(1)}
      </span>
    </div>
  );
}
