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

// Striking defaults inspired by modern design
export const DEFAULT_COLORS = {
  primary: "#0f0f0f",
  secondary: "#ff6b35",
};

// Curated color presets for quick selection
export const COLOR_PRESETS = [
  { name: "Sunset", primary: "#0f0f0f", secondary: "#ff6b35" },
  { name: "Ocean", primary: "#0a192f", secondary: "#64ffda" },
  { name: "Berry", primary: "#1a1a2e", secondary: "#e94560" },
  { name: "Forest", primary: "#1b2d1b", secondary: "#90be6d" },
  { name: "Neon", primary: "#0d0221", secondary: "#f72585" },
  { name: "Gold", primary: "#1c1c1c", secondary: "#ffd700" },
  { name: "Lavender", primary: "#1a1423", secondary: "#c8b6ff" },
  { name: "Coral", primary: "#2b2d42", secondary: "#ef8354" },
] as const;
