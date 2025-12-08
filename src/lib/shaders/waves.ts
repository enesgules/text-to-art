import { DITHER_FUNCTION } from "./index";

export const WAVES_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec2 u_resolution;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv;

    float wave1 = sin(uv.x * 10.0 + u_time) * 0.1;
    float wave2 = sin(uv.x * 15.0 - u_time * 1.3) * 0.05;
    float wave3 = sin(uv.x * 20.0 + u_time * 0.7) * 0.03;

    float waves = wave1 + wave2 + wave3;

    float gradient = uv.y + waves * 2.0;
    gradient = smoothstep(0.0, 1.0, gradient);

    // Three-color gradient: color1 -> color2 -> color3
    vec3 color;
    if (gradient < 0.5) {
      color = mix(u_color1, u_color2, gradient * 2.0);
    } else {
      color = mix(u_color2, u_color3, (gradient - 0.5) * 2.0);
    }

    // Add accent on wave peaks
    float peaks = abs(waves) * 3.0;
    color = mix(color, u_color3, peaks * 0.3);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
