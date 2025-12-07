import { DITHER_FUNCTION } from "./index";

export const PULSE_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv - 0.5;
    float dist = length(uv);

    float t = u_time * 0.8;

    float ring1 = sin(dist * 20.0 - t * 3.0) * 0.5 + 0.5;
    float ring2 = sin(dist * 15.0 - t * 2.0 + 1.0) * 0.5 + 0.5;

    float pulse = ring1 * 0.6 + ring2 * 0.4;
    pulse *= smoothstep(0.6, 0.0, dist);

    float center = 0.1 / (dist + 0.1);
    center = clamp(center * 0.3, 0.0, 1.0);

    vec3 color = mix(u_color1, u_color2, pulse);
    color += u_color2 * center;

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
