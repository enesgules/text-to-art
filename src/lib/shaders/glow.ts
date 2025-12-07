import { DITHER_FUNCTION } from "./index";

export const GLOW_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv - 0.5;

    float dist = length(uv);
    float pulse = sin(u_time * 0.8) * 0.1 + 0.9;

    float glow = 0.15 / (dist * pulse + 0.1);
    glow = pow(glow, 1.5);
    glow = clamp(glow, 0.0, 1.0);

    float ring = smoothstep(0.2, 0.25, dist) * smoothstep(0.35, 0.3, dist);
    ring *= 0.5 + 0.5 * sin(u_time * 2.0);

    vec3 color = mix(u_color1, u_color2, glow);
    color += u_color2 * ring * 0.5;

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
