import { DITHER_FUNCTION } from "./index";

export const RIPPLE_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv - 0.5;
    float dist = length(uv);

    float t = u_time;

    // Multiple ripple sources
    float ripple1 = sin(dist * 30.0 - t * 2.0) * exp(-dist * 3.0);

    vec2 offset1 = vec2(0.2, 0.1);
    float dist2 = length(uv - offset1);
    float ripple2 = sin(dist2 * 25.0 - t * 2.5 + 1.0) * exp(-dist2 * 4.0);

    vec2 offset2 = vec2(-0.15, -0.2);
    float dist3 = length(uv - offset2);
    float ripple3 = sin(dist3 * 28.0 - t * 1.8 + 2.0) * exp(-dist3 * 3.5);

    float combined = (ripple1 + ripple2 * 0.7 + ripple3 * 0.5) * 0.5 + 0.5;

    vec3 color = mix(u_color1, u_color2, combined);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
