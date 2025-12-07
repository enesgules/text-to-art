import { DITHER_FUNCTION } from "./index";

export const MESH_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv;

    float t = u_time * 0.3;

    // Create multiple gradient points that move
    vec2 p1 = vec2(0.3 + sin(t) * 0.2, 0.3 + cos(t * 0.7) * 0.2);
    vec2 p2 = vec2(0.7 + cos(t * 0.8) * 0.2, 0.4 + sin(t * 0.9) * 0.2);
    vec2 p3 = vec2(0.5 + sin(t * 1.1) * 0.2, 0.7 + cos(t * 0.6) * 0.2);
    vec2 p4 = vec2(0.2 + cos(t * 0.5) * 0.15, 0.8 + sin(t * 1.2) * 0.15);

    float d1 = 1.0 - smoothstep(0.0, 0.6, length(uv - p1));
    float d2 = 1.0 - smoothstep(0.0, 0.5, length(uv - p2));
    float d3 = 1.0 - smoothstep(0.0, 0.55, length(uv - p3));
    float d4 = 1.0 - smoothstep(0.0, 0.45, length(uv - p4));

    float blend = (d1 + d2 * 0.8 + d3 * 0.9 + d4 * 0.7) / 3.4;
    blend = smoothstep(0.1, 0.9, blend);

    vec3 color = mix(u_color1, u_color2, blend);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
