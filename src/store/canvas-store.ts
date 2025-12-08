import { create } from "zustand";
import type { CanvasStore } from "@/types";
import { DEFAULT_COLORS } from "@/lib/constants";

export const useCanvasStore = create<CanvasStore>((set) => ({
  font: "abril",
  fontSize: 64,
  textStyle: {
    bold: false,
    italic: false,
    underline: false,
  },
  shaderType: "mesh",
  primaryColor: DEFAULT_COLORS.primary,
  secondaryColor: DEFAULT_COLORS.secondary,
  tertiaryColor: DEFAULT_COLORS.tertiary,
  quaternaryColor: DEFAULT_COLORS.quaternary,
  textColor: DEFAULT_COLORS.text,
  aspectRatio: "1:1",

  setFont: (font) => set({ font }),
  setFontSize: (fontSize) => set({ fontSize }),
  setBold: (bold) => set((state) => ({ textStyle: { ...state.textStyle, bold } })),
  setItalic: (italic) => set((state) => ({ textStyle: { ...state.textStyle, italic } })),
  setUnderline: (underline) => set((state) => ({ textStyle: { ...state.textStyle, underline } })),
  setShaderType: (shaderType) => set({ shaderType }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  setTertiaryColor: (tertiaryColor) => set({ tertiaryColor }),
  setQuaternaryColor: (quaternaryColor) => set({ quaternaryColor }),
  setTextColor: (textColor) => set({ textColor }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
}));
