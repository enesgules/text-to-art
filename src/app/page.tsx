"use client";

import { useState } from "react";
import { ShaderBackground } from "@/components/canvas/ShaderBackground";
import { TextDisplay } from "@/components/TextDisplay";
import { ControlPanel } from "@/components/controls/ControlPanel";
import { useCanvasStore } from "@/store/canvas-store";
import { useExport } from "@/hooks/useExport";

export default function Home() {
  const [text, setText] = useState("memento mori");

  const { shaderType, primaryColor, secondaryColor } = useCanvasStore();

  const { exportToPng, isExporting } = useExport({ text });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ShaderBackground
        shaderType={shaderType}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <TextDisplay text={text} onTextChange={setText} />
      <ControlPanel onDownload={exportToPng} isExporting={isExporting} />
    </div>
  );
}
