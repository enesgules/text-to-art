import { DITHER_FUNCTION } from "./index";

export const LIQUID_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv * 2.0 - 1.0;

    float t = u_time * 0.4;

    uv.x += sin(uv.y * 3.0 + t) * 0.2;
    uv.y += cos(uv.x * 3.0 + t * 1.1) * 0.2;

    float blob1 = 0.3 / length(uv - vec2(sin(t) * 0.5, cos(t * 0.7) * 0.5));
    float blob2 = 0.3 / length(uv - vec2(cos(t * 0.8) * 0.5, sin(t * 1.2) * 0.5));
    float blob3 = 0.2 / length(uv - vec2(sin(t * 1.1) * 0.3, cos(t * 0.9) * 0.3));

    float liquid = blob1 + blob2 + blob3;
    liquid = smoothstep(0.8, 1.2, liquid);

    vec3 color = mix(u_color1, u_color2, liquid);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
