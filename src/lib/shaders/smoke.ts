import { DITHER_FUNCTION } from "./index";

export const SMOKE_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  ${DITHER_FUNCTION}

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = v_uv;

    float t = u_time * 0.2;

    vec2 motion = vec2(t * 0.5, t);
    float smoke = fbm(uv * 3.0 + motion);
    float smoke2 = fbm(uv * 6.0 - motion * 0.5) * 0.5;
    float combined = smoke + smoke2;
    combined = combined * 0.5 + 0.25;

    // Three-color smoke: dark base -> mid smoke -> light wisps
    vec3 color;
    if (combined < 0.4) {
      color = mix(u_color1, u_color2, combined * 2.5);
    } else {
      color = mix(u_color2, u_color3, (combined - 0.4) * 1.67);
    }

    // Add wispy highlights
    float wisps = pow(smoke2, 2.0) * 2.0;
    color = mix(color, u_color3, wisps * 0.3);

    color = applyDither(color, gl_FragCoord.xy);
    gl_FragColor = vec4(color, 1.0);
  }
`;
