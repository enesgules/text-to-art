import { DITHER_FUNCTION } from "./index";

export const ORBIT_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;

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

    // Multiple orbital rings with different colors
    float ring1 = smoothstep(0.02, 0.0, abs(dist - 0.3 - sin(t) * 0.05));
    float ring2 = smoothstep(0.02, 0.0, abs(dist - 0.2 - cos(t * 1.3) * 0.03));
    float ring3 = smoothstep(0.015, 0.0, abs(dist - 0.15 - sin(t * 0.8) * 0.02));

    // Four-color blend based on angle and distance
    float angleNorm = (angle + 3.14159) / 6.28318; // 0 to 1
    vec3 innerColor = mix(u_color2, u_color3, angleNorm);
    vec3 outerColor = mix(u_color1, u_color4, angleNorm);

    vec3 color = mix(outerColor, innerColor, spiral);

    // Add colored rings
    color += u_color3 * ring1 * 0.4;
    color += u_color4 * ring2 * 0.3;
    color += u_color2 * ring3 * 0.2;

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
