import { DITHER_FUNCTION } from "./index";

export const WAVES_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec2 u_resolution;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv;

    float wave1 = sin(uv.x * 10.0 + u_time) * 0.1;
    float wave2 = sin(uv.x * 15.0 - u_time * 1.3) * 0.05;
    float wave3 = sin(uv.x * 20.0 + u_time * 0.7) * 0.03;

    float waves = wave1 + wave2 + wave3;
    float pattern = smoothstep(0.0, 0.02, uv.y - 0.5 + waves);

    float gradient = uv.y + waves * 2.0;
    gradient = smoothstep(0.0, 1.0, gradient);

    vec3 color = mix(u_color1, u_color2, gradient);
    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
