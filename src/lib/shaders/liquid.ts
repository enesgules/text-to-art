import { DITHER_FUNCTION } from "./index";

export const LIQUID_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv * 2.0 - 1.0;

    float t = u_time * 0.4;

    uv.x += sin(uv.y * 3.0 + t) * 0.2;
    uv.y += cos(uv.x * 3.0 + t * 1.1) * 0.2;

    // Four blobs, each with its own color influence
    vec2 b1 = vec2(sin(t) * 0.5, cos(t * 0.7) * 0.5);
    vec2 b2 = vec2(cos(t * 0.8) * 0.5, sin(t * 1.2) * 0.5);
    vec2 b3 = vec2(sin(t * 1.1) * 0.3, cos(t * 0.9) * 0.3);
    vec2 b4 = vec2(cos(t * 0.6) * 0.4, sin(t * 1.4) * 0.4);

    float d1 = 0.3 / length(uv - b1);
    float d2 = 0.3 / length(uv - b2);
    float d3 = 0.25 / length(uv - b3);
    float d4 = 0.25 / length(uv - b4);

    float liquid = d1 + d2 + d3 + d4;
    float mask = smoothstep(0.8, 1.5, liquid);

    // Normalize for color blending
    float total = d1 + d2 + d3 + d4 + 0.001;
    d1 /= total;
    d2 /= total;
    d3 /= total;
    d4 /= total;

    // Blend all four colors based on blob proximity
    vec3 blobColor = u_color2 * d1 + u_color3 * d2 + u_color4 * d3 + u_color3 * d4;

    // Mix between base color and blob colors
    vec3 color = mix(u_color1, blobColor, mask);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
