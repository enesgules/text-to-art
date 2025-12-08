import { DITHER_FUNCTION } from "./index";

export const PLASMA_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec2 u_resolution;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv * 4.0;
    float t = u_time * 0.5;

    float v1 = sin(uv.x + t);
    float v2 = sin(uv.y + t);
    float v3 = sin(uv.x + uv.y + t);
    float v4 = sin(sqrt(uv.x * uv.x + uv.y * uv.y) + t);

    float plasma = (v1 + v2 + v3 + v4) * 0.25;
    plasma = plasma * 0.5 + 0.5;

    // Three-color plasma: smooth transitions through all colors
    vec3 color;
    if (plasma < 0.33) {
      color = mix(u_color1, u_color2, plasma * 3.0);
    } else if (plasma < 0.66) {
      color = mix(u_color2, u_color3, (plasma - 0.33) * 3.0);
    } else {
      color = mix(u_color3, u_color1, (plasma - 0.66) * 3.0);
    }

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
