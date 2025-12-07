export const GRADIENT_FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  void main() {
    float angle = u_time * 0.3;
    vec2 center = vec2(0.5, 0.5);
    vec2 uv = v_uv - center;

    float rotatedX = uv.x * cos(angle) - uv.y * sin(angle);
    float rotatedY = uv.x * sin(angle) + uv.y * cos(angle);

    float gradient = rotatedX + rotatedY + 0.5;
    gradient = gradient * 0.5 + 0.5;
    gradient = smoothstep(0.0, 1.0, gradient);

    vec3 color = mix(u_color1, u_color2, gradient);
    gl_FragColor = vec4(color, 1.0);
  }
`;
