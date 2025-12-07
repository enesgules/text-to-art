"use client";

import { FontSelector } from "./FontSelector";
import { FontSizeSelector } from "./FontSizeSelector";
import { TextStyleToggles } from "./TextStyleToggles";
import { ShaderSelector } from "./ShaderSelector";
import { ColorControls } from "./ColorControls";
import { AspectRatioSelector } from "./AspectRatioSelector";
import { DownloadButton } from "./DownloadButton";

interface ControlPanelProps {
  onDownload: () => void;
  isExporting?: boolean;
}

export function ControlPanel({ onDownload, isExporting }: ControlPanelProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 w-48">
      <div className="space-y-6">
        {/* Text controls */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Text</span>
          <FontSelector />
          <FontSizeSelector />
          <TextStyleToggles />
        </div>

        <div className="h-px bg-white/10" />

        {/* Background controls */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Background</span>
          <ShaderSelector />
          <ColorControls />
        </div>

        <div className="h-px bg-white/10" />

        {/* Export controls */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Export</span>
          <AspectRatioSelector />
          <DownloadButton onDownload={onDownload} isExporting={isExporting} />
        </div>
      </div>
    </div>
  );
}
