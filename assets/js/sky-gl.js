/* ============================================================
 * SkyGL —— 程序化 WebGL 天空（昼夜循环）
 * 用滚动进度 uTime (0..5) 驱动：深夜→破晓→正午→午后→黄昏→深夜
 * 无外部依赖，单文件。挂到 window.SkyGL。
 * ============================================================ */
(function () {
  "use strict";

  const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const FRAG = `
precision highp float;
uniform float uTime;   // 滚动进度 0..5
uniform float uClock;  // 真实秒数，用于云层漂移 / 星闪
uniform vec2  uRes;

/* ---------- 噪声 ---------- */
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
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
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

/* ---------- 昼夜调色板（6 帧，对应 sp 0..5） ---------- */
vec3 zenithAt(int i) {
  if (i == 0) return vec3(0.059, 0.118, 0.227); // 深夜 0f1e3a
  if (i == 1) return vec3(0.435, 0.498, 0.639); // 破晓 6f7fa3
  if (i == 2) return vec3(0.357, 0.608, 0.835); // 正午 5b9bd5
  if (i == 3) return vec3(0.420, 0.659, 0.847); // 午后 6ba8d8
  if (i == 4) return vec3(0.290, 0.275, 0.345); // 黄昏 4a4658
  return vec3(0.059, 0.118, 0.227);              // 深夜
}
vec3 horizonAt(int i) {
  if (i == 0) return vec3(0.110, 0.180, 0.314); // 1c2e50
  if (i == 1) return vec3(0.941, 0.847, 0.753); // f0d8c0
  if (i == 2) return vec3(0.863, 0.922, 0.969); // dcebf7
  if (i == 3) return vec3(0.886, 0.929, 0.957); // e2edf4
  if (i == 4) return vec3(0.910, 0.659, 0.471); // e8a878
  return vec3(0.110, 0.180, 0.314);              // 1c2e50
}
/* 云层覆盖率 */
float coverAt(int i) {
  if (i == 0) return 0.28;
  if (i == 1) return 0.82;
  if (i == 2) return 0.52;
  if (i == 3) return 0.58;
  if (i == 4) return 0.86;
  return 0.28;
}
/* 太阳位置（屏幕 uv：x 0..1 左到右 = 西到东，y 0..1 下到上）——东升西落 */
vec2 sunPosAt(int i) {
  if (i == 0) return vec2(0.95, -0.30); // 夜·东侧地平线下
  if (i == 1) return vec2(0.88,  0.08); // 破晓·东（右）升起
  if (i == 2) return vec2(0.48,  0.94); // 正午·天顶
  if (i == 3) return vec2(0.20,  0.66); // 午后·偏西下沉
  if (i == 4) return vec2(0.05,  0.10); // 黄昏·西（左）落下
  return vec2(0.05, -0.30);             // 夜·西侧地平线下
}
/* 月亮位置：东（右）升 → 高空 → 天亮时在西（左）落下；末屏再度东升 */
vec2 moonPosAt(int i) {
  if (i == 0) return vec2(0.62, 0.80);  // 首屏·高空，正在西行
  if (i == 1) return vec2(0.08, -0.12); // 天亮·西（左）落下
  if (i == 2) return vec2(0.05, -0.60);
  if (i == 3) return vec2(0.05, -0.60);
  if (i == 4) return vec2(1.12, -0.60);
  return vec2(0.90, 0.24);              // 末屏·东（右）初升
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float t = clamp(uTime, 0.0, 5.0);

  /* ---- 在相邻两帧之间插值 ---- */
  float tf = floor(t);
  int i0 = int(tf);
  int i1 = i0 + 1;
  float f = fract(t);
  f = f * f * (3.0 - 2.0 * f);

  vec3 zen = mix(zenithAt(i0), zenithAt(i1), f);
  vec3 hor = mix(horizonAt(i0), horizonAt(i1), f);
  float cover = mix(coverAt(i0), coverAt(i1), f);
  vec2 sunPos = mix(sunPosAt(i0), sunPosAt(i1), f);
  vec2 moonPos = mix(moonPosAt(i0), moonPosAt(i1), f);

  /* ---- 天空垂直渐变 ---- */
  float v = pow(clamp(uv.y, 0.0, 1.0), 0.62);
  vec3 col = mix(hor, zen, v);

  /* ---- 太阳高度（光照强度） ---- */
  float sunAlt = clamp(sunPos.y, 0.0, 1.0);
  float sunVis = smoothstep(-0.02, 0.06, sunPos.y);

  if (sunVis > 0.001) {
    float d = distance(uv, sunPos);
    float disc = smoothstep(0.014, 0.0, d);
    float glow = exp(-d * 16.0) * 0.55 + exp(-d * 5.0) * 0.30;
    vec3 sunCol = mix(vec3(1.0, 0.78, 0.52), vec3(1.0, 0.98, 0.94), sunAlt);
    col += sunCol * (disc + glow) * sunVis;
  }

  /* ---- 月亮（月牙 + 淡淡月光，仅首尾夜空可见） ---- */
  float moonVis = max(max(0.0, 1.0 - t * 0.9), max(0.0, (t - 4.2) / 0.8));
  if (moonVis > 0.001) {
    /* 按宽高比校正，保证月牙是正圆裁出来的 */
    vec2 asp = vec2(uRes.x / uRes.y, 1.0);
    vec2 mp = (uv - moonPos) * asp;
    float r = 0.038;
    float aa = 0.0018;
    float dd = length(mp);
    float disc = smoothstep(r + aa, r - aa, dd);
    /* 偏移圆遮罩，边缘柔和过渡，避免露出“被圆切掉”的硬边 */
    float shadow = smoothstep(r + aa * 3.2, r - aa * 3.2, length(mp - vec2(r * 0.34, -r * 0.43)));
    float crescent = disc * (1.0 - shadow);
    /* 暗面只留极淡地照，向四周自然淡出，不出现圆形轮廓 */
    float earthshine = (1.0 - smoothstep(r * 0.35, r * 1.15, dd)) * 0.045;
    /* 月光：一层柔晕 */
    float glow = exp(-dd * 6.2) * 0.16 + exp(-dd * 2.4) * 0.05;
    vec3 moonCol = vec3(0.93, 0.94, 1.0);
    col += moonCol * (crescent * 0.95 + earthshine + glow) * moonVis;
  }

  /* ---- 星空 ---- */
  float night = max(max(0.0, 1.0 - t * 0.85), max(0.0, (t - 4.0) / 0.9));
  if (night > 0.001) {
    vec2 grid = uv * vec2(90.0, 50.0);
    vec2 g = floor(grid);
    vec2 cell = grid - g;
    float h = hash(g);
    if (h > 0.987) {
      vec2 c = vec2(hash(g + 1.7), hash(g + 3.1));
      float d = distance(cell, c);
      float star = smoothstep(0.09, 0.0, d);
      float tw = 0.55 + 0.45 * sin(uClock * 1.8 + h * 40.0);
      col += vec3(1.0, 0.98, 0.92) * night * tw * star * 0.9;
    }
  }

  /* ---- 云层：两层 fbm，低对比、缓慢漂移、受日光照染 ---- */
  /* 高空薄云：更细更淡 */
  vec2 p1 = uv * vec2(3.2, 2.0) + vec2(uClock * 0.0070, uClock * 0.0022);
  float c1 = smoothstep(0.52, 0.86, fbm(p1));
  /* 近地平线聚集的厚云带 */
  vec2 p2 = uv * vec2(2.1, 1.15) + vec2(uClock * 0.0110, uClock * 0.0032);
  float band = exp(-pow((uv.y - 0.26) * 2.1, 2.0));
  float c2 = smoothstep(0.46, 0.80, fbm(p2)) * band;

  float cloud = clamp(c1 * 0.30 + c2 * 0.68, 0.0, 1.0) * cover * 0.9;

  if (cloud > 0.001) {
    /* 云底色：深夜冷蓝 → 白天纯白 → 日出日落暖橙 */
    vec3 cloudCol = mix(vec3(0.13, 0.16, 0.26), vec3(1.0), sunAlt);
    cloudCol = mix(cloudCol, vec3(1.0, 0.80, 0.58), (1.0 - sunAlt) * 0.70);
    /* 朝向太阳的一侧被照亮，形成边缘光 */
    float rim = exp(-distance(uv, sunPos) * 3.0) * (1.0 - sunAlt) * sunVis;
    cloudCol += vec3(1.0, 0.76, 0.48) * rim * 0.45;
    col = mix(col, cloudCol, cloud);
  }

  /* ---- 远景地平线辉光（日出日落时） ---- */
  float warmAmt = (1.0 - sunAlt) * smoothstep(0.05, 0.5, sunVis);
  if (warmAmt > 0.001) {
    float hg = exp(-pow((uv.y - 0.02) * 6.0, 2.0));
    col += vec3(1.0, 0.55, 0.28) * hg * warmAmt * 0.22;
  }

  gl_FragColor = vec4(col, 1.0);
}`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error("SkyGL shader compile error: " + log);
    }
    return sh;
  }

  function createSkyGL(canvas) {
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return null;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("SkyGL link error: " + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    // 全屏三角形
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uClock = gl.getUniformLocation(program, "uClock");
    const uRes = gl.getUniformLocation(program, "uRes");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let progress = 0;
    let raf = 0;
    let start = performance.now();
    let running = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    }

    function frame() {
      if (!running) return;
      const clock = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, progress);
      gl.uniform1f(uClock, clock);
      gl.uniform2f(uRes, w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();
    window.addEventListener("resize", resize);

    return {
      setProgress(p) { progress = p; },
      destroy() {
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
      },
    };
  }

  // 暴露到全局，main.js 里调用
  window.SkyGL = { create: createSkyGL };
})();
