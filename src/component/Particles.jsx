import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

import './Particles.css';

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const getParticleLimit = () => {
  if (typeof window === 'undefined') return 150;
  if (window.innerWidth < 640) return 48;
  if (window.innerWidth < 1024) return 96;
  return 150;
};

const hexToRgb = hex => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(hex.slice(0, 6), 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if (uAlphaParticles < 0.5) {
      if (d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const Particles = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className,
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [particleLimit, setParticleLimit] = useState(getParticleLimit);
  const responsiveParticleCount = Math.min(particleCount, particleLimit);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)');
    const tablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    const updateLimit = () => setParticleLimit(mobile.matches ? 48 : tablet.matches ? 96 : 150);

    mobile.addEventListener('change', updateLimit);
    tablet.addEventListener('change', updateLimit);
    return () => {
      mobile.removeEventListener('change', updateLimit);
      tablet.removeEventListener('change', updateLimit);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const effectivePixelRatio = Math.min(pixelRatio, 1.5, window.devicePixelRatio || 1);
    const allowHoverMotion = moveParticlesOnHover && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;

    const renderer = new Renderer({
      dpr: effectivePixelRatio,
      depth: false,
      alpha: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);
    let particles = null;

    let previousWidth = 0;
    let previousHeight = 0;
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height || (width === previousWidth && height === previousHeight)) return;
      previousWidth = width;
      previousHeight = height;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
      if (reduceMotion && particles) renderer.render({ scene: particles, camera });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (allowHoverMotion) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const count = responsiveParticleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * effectivePixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId = null;
    let lastTime = performance.now();
    let elapsed = 0;
    let isInView = false;
    let isPageVisible = !document.hidden;

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const startAnimation = () => {
      if (animationFrameId !== null || !isInView || !isPageVisible || reduceMotion) return;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(update);
    };

    const update = t => {
      animationFrameId = null;
      if (!isInView || !isPageVisible || reduceMotion) return;
      const delta = Math.min(Math.max(t - lastTime, 0), 32);
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (allowHoverMotion) {
        const easing = 1 - Math.exp(-delta * 0.012);
        const targetX = -mouseRef.current.x * particleHoverFactor;
        const targetY = -mouseRef.current.y * particleHoverFactor;
        particles.position.x += (targetX - particles.position.x) * easing;
        particles.position.y += (targetY - particles.position.y) * easing;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += delta * 0.0006 * speed;
      }

      renderer.render({ scene: particles, camera });
      animationFrameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView && reduceMotion) renderer.render({ scene: particles, camera });
      else if (isInView) startAnimation();
      else stopAnimation();
    });
    observer.observe(container);

    const handleMotionPreferenceChange = event => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        stopAnimation();
        if (isInView && isPageVisible) renderer.render({ scene: particles, camera });
      } else {
        startAnimation();
      }
    };
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) startAnimation();
      else stopAnimation();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (allowHoverMotion) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      stopAnimation();
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responsiveParticleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio,
  ]);

  return <div ref={containerRef} className={`particles-container ${className || ''}`} />;
};

export default Particles;
