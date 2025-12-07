"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCanvasStore } from "@/store/canvas-store";
import { FONTS, FontValue } from "@/lib/fonts";

export function FontSelector() {
  const { font, setFont } = useCanvasStore();

  return (
    <Select value={font} onValueChange={(value) => setFont(value as FontValue)}>
      <SelectTrigger className="w-full h-9 bg-transparent border-white/20 text-white text-sm hover:border-white/40 transition-colors">
        <SelectValue placeholder="Font" />
      </SelectTrigger>
      <SelectContent>
        {FONTS.map((f) => (
          <SelectItem
            key={f.value}
            value={f.value}
            style={{ fontFamily: f.cssVar }}
          >
            {f.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
