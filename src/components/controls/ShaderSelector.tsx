"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCanvasStore } from "@/store/canvas-store";
import { SHADER_TYPES, ShaderType } from "@/lib/constants";

export function ShaderSelector() {
  const { shaderType, setShaderType } = useCanvasStore();

  return (
    <Select
      value={shaderType}
      onValueChange={(value) => setShaderType(value as ShaderType)}
    >
      <SelectTrigger className="w-full h-9 bg-transparent border-white/20 text-white text-sm hover:border-white/40 transition-colors">
        <SelectValue placeholder="Effect" />
      </SelectTrigger>
      <SelectContent>
        {SHADER_TYPES.map((shader) => (
          <SelectItem key={shader.value} value={shader.value}>
            {shader.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
