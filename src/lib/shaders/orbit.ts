import { DITHER_FUNCTION } from "./index";

export const ORBIT_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  ${DITHER_FUNCTION}

  void main() {
    vec2 uv = v_uv - 0.5;

    float angle = atan(uv.y, uv.x);
    float dist = length(uv);

    float t = u_time * 0.5;

    float spiral = sin(angle * 3.0 + dist * 10.0 - t * 2.0);
    spiral += sin(angle * 5.0 - dist * 8.0 + t * 1.5) * 0.5;
    spiral = spiral * 0.5 + 0.5;

    float fade = smoothstep(0.5, 0.0, dist);
    spiral *= fade;

    float ring = smoothstep(0.02, 0.0, abs(dist - 0.3 - sin(t) * 0.05));
    ring += smoothstep(0.02, 0.0, abs(dist - 0.2 - cos(t * 1.3) * 0.03)) * 0.5;

    vec3 color = mix(u_color1, u_color2, spiral);
    color += u_color2 * ring * 0.3;

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
