"use client";

import { useState, useCallback } from "react";
import { useCanvasStore } from "@/store/canvas-store";
import { ASPECT_RATIOS } from "@/lib/constants";
import { FONTS } from "@/lib/fonts";
import {
  VERTEX_SHADER,
  createShader,
  createProgram,
  setupQuad,
  hexToRgb,
} from "@/lib/shaders";
import { WAVES_FRAGMENT_SHADER } from "@/lib/shaders/waves";
import { PLASMA_FRAGMENT_SHADER } from "@/lib/shaders/plasma";
import { AURORA_FRAGMENT_SHADER } from "@/lib/shaders/aurora";
import { GLOW_FRAGMENT_SHADER } from "@/lib/shaders/glow";
import { LIQUID_FRAGMENT_SHADER } from "@/lib/shaders/liquid";
import { SMOKE_FRAGMENT_SHADER } from "@/lib/shaders/smoke";
import { ORBIT_FRAGMENT_SHADER } from "@/lib/shaders/orbit";
import { PULSE_FRAGMENT_SHADER } from "@/lib/shaders/pulse";
import { MESH_FRAGMENT_SHADER } from "@/lib/shaders/mesh";
import { RIPPLE_FRAGMENT_SHADER } from "@/lib/shaders/ripple";
import type { ShaderType } from "@/lib/constants";

const FRAGMENT_SHADERS: Record<ShaderType, string> = {
  waves: WAVES_FRAGMENT_SHADER,
  plasma: PLASMA_FRAGMENT_SHADER,
  aurora: AURORA_FRAGMENT_SHADER,
  glow: GLOW_FRAGMENT_SHADER,
  liquid: LIQUID_FRAGMENT_SHADER,
  smoke: SMOKE_FRAGMENT_SHADER,
  orbit: ORBIT_FRAGMENT_SHADER,
  pulse: PULSE_FRAGMENT_SHADER,
  mesh: MESH_FRAGMENT_SHADER,
  ripple: RIPPLE_FRAGMENT_SHADER,
};

const EXPORT_SIZE = 1080; // Base export size

interface UseExportProps {
  text: string;
}

export function useExport({ text }: UseExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const {
    aspectRatio,
    shaderType,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
    textColor,
    font,
    fontSize,
    textStyle,
  } = useCanvasStore();

  const exportToPng = useCallback(async () => {
    setIsExporting(true);

    try {
      // Calculate export dimensions based on aspect ratio
      const ratio = ASPECT_RATIOS.find((r) => r.value === aspectRatio);
      if (!ratio) return;

      let width: number;
      let height: number;

      if (ratio.width >= ratio.height) {
        width = EXPORT_SIZE;
        height = (EXPORT_SIZE * ratio.height) / ratio.width;
      } else {
        height = EXPORT_SIZE;
        width = (EXPORT_SIZE * ratio.width) / ratio.height;
      }

      // Create offscreen canvas for shader
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const gl = canvas.getContext("webgl", {
        preserveDrawingBuffer: true,
        antialias: true,
      });

      if (!gl) {
        console.error("WebGL not supported");
        return;
      }

      // Compile shaders
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        FRAGMENT_SHADERS[shaderType]
      );

      if (!vertexShader || !fragmentShader) return;

      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) return;

      gl.useProgram(program);
      setupQuad(gl, program);

      // Render shader
      gl.viewport(0, 0, width, height);

      const timeLocation = gl.getUniformLocation(program, "u_time");
      const color1Location = gl.getUniformLocation(program, "u_color1");
      const color2Location = gl.getUniformLocation(program, "u_color2");
      const color3Location = gl.getUniformLocation(program, "u_color3");
      const color4Location = gl.getUniformLocation(program, "u_color4");

      gl.uniform1f(timeLocation, Math.random() * 10); // Random time for variety
      gl.uniform3fv(color1Location, hexToRgb(primaryColor));
      gl.uniform3fv(color2Location, hexToRgb(secondaryColor));
      gl.uniform3fv(color3Location, hexToRgb(tertiaryColor));
      gl.uniform3fv(color4Location, hexToRgb(quaternaryColor));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Create final canvas and draw shader
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = width;
      finalCanvas.height = height;
      const ctx = finalCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(canvas, 0, 0);

      // Draw text
      const fontConfig = FONTS.find((f) => f.value === font);
      const fontName = fontConfig?.name || "sans-serif";

      // Scale font size proportionally
      const scaleFactor = width / window.innerWidth;
      const scaledFontSize = fontSize * scaleFactor * 2; // 2x for higher quality

      let fontStyle = "";
      if (textStyle.italic) fontStyle += "italic ";
      if (textStyle.bold) fontStyle += "bold ";

      ctx.font = `${fontStyle}${scaledFontSize}px "${fontName}"`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Handle multi-line text
      const lines = text.split("\n");
      const lineHeight = scaledFontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const startY = height / 2 - totalHeight / 2 + lineHeight / 2;

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(line, width / 2, y);

        if (textStyle.underline && line.trim()) {
          const metrics = ctx.measureText(line);
          const underlineY = y + scaledFontSize * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = textColor;
          ctx.lineWidth = scaledFontSize * 0.05;
          ctx.moveTo(width / 2 - metrics.width / 2, underlineY);
          ctx.lineTo(width / 2 + metrics.width / 2, underlineY);
          ctx.stroke();
        }
      });

      // Download
      const link = document.createElement("a");
      link.download = `text-to-art-${aspectRatio.replace(":", "x")}.png`;
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  }, [
    aspectRatio,
    shaderType,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
    textColor,
    font,
    fontSize,
    textStyle,
    text,
  ]);

  return { exportToPng, isExporting };
}
