export const ASPECT_RATIOS = [
  { name: "Square", value: "1:1", width: 1, height: 1 },
  { name: "Landscape", value: "16:9", width: 16, height: 9 },
  { name: "Portrait", value: "9:16", width: 9, height: 16 },
  { name: "Standard", value: "4:3", width: 4, height: 3 },
] as const;

export type AspectRatioValue = (typeof ASPECT_RATIOS)[number]["value"];

export const FONT_SIZES = [
  { name: "S", value: 24 },
  { name: "M", value: 36 },
  { name: "L", value: 48 },
  { name: "XL", value: 64 },
  { name: "2XL", value: 96 },
] as const;

export const SHADER_TYPES = [
  { name: "Waves", value: "waves" },
  { name: "Plasma", value: "plasma" },
  { name: "Aurora", value: "aurora" },
  { name: "Glow", value: "glow" },
  { name: "Liquid", value: "liquid" },
  { name: "Smoke", value: "smoke" },
  { name: "Orbit", value: "orbit" },
  { name: "Pulse", value: "pulse" },
  { name: "Mesh", value: "mesh" },
  { name: "Ripple", value: "ripple" },
] as const;

export type ShaderType = (typeof SHADER_TYPES)[number]["value"];

// Modern defaults with 4 colors
export const DEFAULT_COLORS = {
  primary: "#0f0f23",
  secondary: "#1a1a3e",
  tertiary: "#4a4e69",
  quaternary: "#9a8c98",
  text: "#ffffff",
};

// Shader color counts - how many colors each shader uses
export const SHADER_COLOR_COUNTS: Record<ShaderType, number> = {
  waves: 3,
  plasma: 3,
  aurora: 3,
  glow: 3,
  liquid: 4,
  smoke: 3,
  orbit: 4,
  pulse: 2,
  mesh: 4,
  ripple: 2,
};

// Curated color presets with 4 colors each
export const COLOR_PRESETS = [
  { name: "Midnight", colors: ["#0f0f23", "#1a1a3e", "#4a4e69", "#9a8c98"] },
  { name: "Sunset", colors: ["#1a1423", "#ff6b35", "#f7c59f", "#efa94a"] },
  { name: "Ocean", colors: ["#0a192f", "#172a45", "#64ffda", "#a8dadc"] },
  { name: "Berry", colors: ["#1a1a2e", "#16213e", "#e94560", "#ff8585"] },
  { name: "Forest", colors: ["#1b2d1b", "#2d4a2d", "#90be6d", "#d4e09b"] },
  { name: "Neon", colors: ["#0d0221", "#2a0845", "#f72585", "#7209b7"] },
  { name: "Ember", colors: ["#1c1c1c", "#2d2d2d", "#ff4500", "#ffd700"] },
  { name: "Frost", colors: ["#1a1a2e", "#2b4570", "#a8dadc", "#e0fbfc"] },
] as const;
