import { useEffect, useRef } from 'react'
import './SkyBackground.css'

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// Ray-marched volumetric clouds
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_res;

// ── Noise ─────────────────────────────────────────────────────────────────
float hash(vec3 p) {
  p = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i),             hash(i+vec3(1,0,0)), u.x),
        mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), u.x), u.y),
    mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), u.x),
        mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 p) {
  float v = 0.0, a = 0.52;
  v += a * noise(p); p = p * 2.1 + vec3(1.3, 1.7, 2.1); a *= 0.5;
  v += a * noise(p); p = p * 2.1 + vec3(1.3, 1.7, 2.1); a *= 0.5;
  v += a * noise(p); p = p * 2.1 + vec3(1.3, 1.7, 2.1); a *= 0.5;
  v += a * noise(p); p = p * 2.1 + vec3(1.3, 1.7, 2.1); a *= 0.5;
  v += a * noise(p);
  return v;
}

// ── Cloud density at world point ──────────────────────────────────────────
float density(vec3 p) {
  float base   = fbm(p * vec3(0.8, 0.4, 0.8));
  float detail = fbm(p * 2.5 + vec3(4.1, 2.3, 1.7)) * 0.35;
  float d = base + detail - 0.58;
  float band = 1.0 - abs(p.y - 0.5) * 3.2;
  return max(0.0, d * band);
}

// ── Main ──────────────────────────────────────────────────────────────────
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  // Sky gradient
  vec3 skyHigh = vec3(0.08, 0.28, 0.58);
  vec3 skyMid  = vec3(0.25, 0.58, 0.88);
  vec3 skyHori = vec3(0.62, 0.84, 0.97);
  float t = uv.y;
  vec3 sky = t > 0.5
    ? mix(skyMid, skyHigh, (t - 0.5) * 2.0)
    : mix(skyHori, skyMid, t * 2.0);

  // Sun
  vec3 sunDir  = normalize(vec3(0.6, 0.9, 0.4));
  vec2 sunUV   = vec2(0.78, 0.88);
  float sunD   = length(uv - sunUV);
  sky += vec3(1.0, 0.97, 0.82) * (exp(-sunD * 7.0) * 0.55 + exp(-sunD * 2.5) * 0.15);

  // Ray march through cloud slab
  vec3 ro = vec3(uv.x * 3.5, 0.0, u_time * 0.018);
  vec3 rd = normalize(vec3((uv.x - 0.5) * 0.4, 1.0, (uv.y - 0.3) * 0.6));

  vec3  cloudCol = vec3(0.0);
  float transmit = 1.0;
  float stepSz   = 0.08;

  for (int i = 0; i < 14; i++) {
    vec3 pos = ro + rd * (float(i) * stepSz);
    pos.y = float(i) * stepSz * 0.5 + 0.1;

    float d = density(pos);
    if (d > 0.001) {
      float shadow = 0.0;
      vec3 lp = pos;
      lp += sunDir * 0.10; shadow += density(lp);
      lp += sunDir * 0.10; shadow += density(lp);
      lp += sunDir * 0.10; shadow += density(lp);

      float light  = exp(-shadow * 1.8);
      float powder = 1.0 - exp(-d * 4.0);

      vec3 cTop  = vec3(1.00, 1.00, 0.98);
      vec3 cBase = vec3(0.55, 0.60, 0.70);
      float lit  = clamp(light + powder * 0.3, 0.0, 1.0);
      vec3  col  = mix(cBase, cTop, lit);

      float alpha = min(d * stepSz * 3.0, 1.0);
      cloudCol  += col * alpha * transmit;
      transmit  *= (1.0 - alpha * 0.85);
      if (transmit < 0.03) break;
    }
  }

  vec3 final = sky * transmit + cloudCol;
  gl_FragColor = vec4(final, 1.0);
}
`

function compileShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

const CLOUDS = [
  { layer: 'back',  top: '12%', delay: '-8s',   scale: 0.65 },
  { layer: 'back',  top: '40%', delay: '-72s',   scale: 0.7  },
  { layer: 'mid',   top: '22%', delay: '-38s',   scale: 1.0  },
  { layer: 'mid',   top: '52%', delay: '-95s',   scale: 0.85 },
  { layer: 'front', top: '16%', delay: '-55s',   scale: 1.2  },
  { layer: 'front', top: '34%', delay: '-22s',   scale: 1.35 },
]

function Cloud({ layer, top, delay, scale }) {
  return (
    <div className={`cloud cloud--${layer}`} style={{ top, animationDelay: delay, transform: `scale(${scale})` }}>
      <div className="cloud__blob cloud__blob--1" />
      <div className="cloud__blob cloud__blob--2" />
      <div className="cloud__blob cloud__blob--3" />
      <div className="cloud__blob cloud__blob--4" />
      <div className="cloud__blob cloud__blob--5" />
    </div>
  )
}

export default function SkyBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    const prog = gl.createProgram()
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes  = gl.getUniformLocation(prog, 'u_res')

    let raf
    const DPR = Math.min(window.devicePixelRatio, 1.5)

    function resize() {
      canvas.width  = canvas.offsetWidth  * DPR
      canvas.height = canvas.offsetHeight * DPR
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    function render(t) {
      gl.uniform1f(uTime, t * 0.001)
      gl.uniform2f(uRes,  canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="sky-bg">
      <canvas ref={canvasRef} className="sky-canvas" />
      <div className="sky-clouds" aria-hidden="true">
        {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}
      </div>
    </div>
  )
}
