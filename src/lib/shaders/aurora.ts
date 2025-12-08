import { DITHER_FUNCTION } from "./index";

export const AURORA_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv;

    float wave1 = sin(uv.x * 3.0 + u_time * 0.5) * 0.5;
    float wave2 = sin(uv.x * 5.0 - u_time * 0.3) * 0.3;
    float wave3 = sin(uv.x * 7.0 + u_time * 0.7) * 0.2;

    float aurora = wave1 + wave2 + wave3;
    float mask = smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.5, uv.y);

    float intensity = smoothstep(aurora - 0.3, aurora + 0.3, uv.y - 0.3);
    intensity *= mask;

    // Shimmer effect with third color
    float shimmer = 0.8 + 0.2 * sin(uv.x * 20.0 + u_time);
    intensity *= shimmer;

    // Three-color aurora: base -> mid -> highlight
    vec3 color = mix(u_color1, u_color2, intensity);

    // Add shimmer highlights with third color
    float highlight = pow(intensity, 2.0) * shimmer;
    color = mix(color, u_color3, highlight * 0.6);

    color += intensity * 0.2;

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
