import type { FontValue } from "@/lib/fonts";
import type { AspectRatioValue, ShaderType } from "@/lib/constants";

export interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface CanvasState {
  font: FontValue;
  fontSize: number;
  textStyle: TextStyle;
  shaderType: ShaderType;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
  textColor: string;
  aspectRatio: AspectRatioValue;
}

export interface CanvasActions {
  setFont: (font: FontValue) => void;
  setFontSize: (size: number) => void;
  setBold: (bold: boolean) => void;
  setItalic: (italic: boolean) => void;
  setUnderline: (underline: boolean) => void;
  setShaderType: (type: ShaderType) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setTertiaryColor: (color: string) => void;
  setQuaternaryColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setAspectRatio: (ratio: AspectRatioValue) => void;
}

export type CanvasStore = CanvasState & CanvasActions;
