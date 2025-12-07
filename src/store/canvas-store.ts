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
  aspectRatio: "1:1",

  setFont: (font) => set({ font }),
  setFontSize: (fontSize) => set({ fontSize }),
  setBold: (bold) => set((state) => ({ textStyle: { ...state.textStyle, bold } })),
  setItalic: (italic) => set((state) => ({ textStyle: { ...state.textStyle, italic } })),
  setUnderline: (underline) => set((state) => ({ textStyle: { ...state.textStyle, underline } })),
  setShaderType: (shaderType) => set({ shaderType }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
}));
