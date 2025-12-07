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
  { name: "Gradient", value: "gradient" },
  { name: "Noise", value: "noise" },
  { name: "Waves", value: "waves" },
  { name: "Plasma", value: "plasma" },
  { name: "Voronoi", value: "voronoi" },
] as const;

export type ShaderType = (typeof SHADER_TYPES)[number]["value"];

// Art nouveau inspired defaults
export const DEFAULT_COLORS = {
  primary: "#1a1a2e",
  secondary: "#e94560",
};
