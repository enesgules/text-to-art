export const VORONOI_FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  vec2 random2(vec2 p) {
    return fract(sin(vec2(
      dot(p, vec2(127.1, 311.7)),
      dot(p, vec2(269.5, 183.3))
    )) * 43758.5453);
  }

  void main() {
    vec2 uv = v_uv * 5.0;
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv);

    float minDist = 1.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = random2(i_uv + neighbor);

        point = 0.5 + 0.5 * sin(u_time * 0.5 + 6.2831 * point);

        vec2 diff = neighbor + point - f_uv;
        float dist = length(diff);
        minDist = min(minDist, dist);
      }
    }

    float pattern = minDist;
    vec3 color = mix(u_color1, u_color2, pattern);
    gl_FragColor = vec4(color, 1.0);
  }
`;
