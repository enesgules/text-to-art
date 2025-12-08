"use client";

import { useEffect, useRef, useCallback } from "react";
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

interface ShaderBackgroundProps {
  shaderType: ShaderType;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
}

export function ShaderBackground({
  shaderType,
  primaryColor,
  secondaryColor,
  tertiaryColor,
  quaternaryColor,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to window size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const gl = canvas.getContext("webgl", {
      preserveDrawingBuffer: true,
      antialias: true,
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADERS[shaderType]
    );

    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    programRef.current = program;
    gl.useProgram(program);
    setupQuad(gl, program);
  }, [shaderType]);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    gl.viewport(0, 0, canvas.width, canvas.height);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const color1Location = gl.getUniformLocation(program, "u_color1");
    const color2Location = gl.getUniformLocation(program, "u_color2");
    const color3Location = gl.getUniformLocation(program, "u_color3");
    const color4Location = gl.getUniformLocation(program, "u_color4");

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    gl.uniform1f(timeLocation, elapsed);
    gl.uniform3fv(color1Location, hexToRgb(primaryColor));
    gl.uniform3fv(color2Location, hexToRgb(secondaryColor));
    gl.uniform3fv(color3Location, hexToRgb(tertiaryColor));
    gl.uniform3fv(color4Location, hexToRgb(quaternaryColor));

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [primaryColor, secondaryColor, tertiaryColor, quaternaryColor]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      if (!canvas || !gl) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    initWebGL();
    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initWebGL, render]);

  // Re-initialize when shader type changes
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    initWebGL();
    render();
  }, [shaderType, initWebGL, render]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
