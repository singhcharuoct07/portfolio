import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import './ShinyText.css';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const elementRef = useRef(null);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    let isInView = false;
    let isPageVisible = !document.hidden;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;
    let frameId = null;

    const update = time => {
      frameId = null;
      if (!isInView || !isPageVisible || reduceMotion || disabled || isPaused) {
        lastTimeRef.current = null;
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      } else {
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
          const cycleDuration = animationDuration + delayDuration;
          const cycleTime = elapsedRef.current % (cycleDuration * 2);

          if (cycleTime < animationDuration) {
            const p = (cycleTime / animationDuration) * 100;
            progress.set(directionRef.current === 1 ? p : 100 - p);
          } else if (cycleTime < cycleDuration) {
            progress.set(directionRef.current === 1 ? 100 : 0);
          } else if (cycleTime < cycleDuration + animationDuration) {
            const reverseTime = cycleTime - cycleDuration;
            const p = 100 - (reverseTime / animationDuration) * 100;
            progress.set(directionRef.current === 1 ? p : 100 - p);
          } else {
            progress.set(directionRef.current === 1 ? 0 : 100);
          }
        } else {
          const cycleDuration = animationDuration + delayDuration;
          const cycleTime = elapsedRef.current % cycleDuration;

          if (cycleTime < animationDuration) {
            const p = (cycleTime / animationDuration) * 100;
            progress.set(directionRef.current === 1 ? p : 100 - p);
          } else {
            progress.set(directionRef.current === 1 ? 100 : 0);
          }
        }
      }

      frameId = requestAnimationFrame(update);
    };

    const startAnimation = () => {
      if (frameId === null && isInView && isPageVisible && !reduceMotion && !disabled && !isPaused) {
        frameId = requestAnimationFrame(update);
      }
    };

    const stopAnimation = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      lastTimeRef.current = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) startAnimation();
      else stopAnimation();
    });
    observer.observe(element);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) startAnimation();
      else stopAnimation();
    };
    const handleMotionPreferenceChange = event => {
      reduceMotion = event.matches;
      if (reduceMotion) stopAnimation();
      else startAnimation();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      stopAnimation();
    };
  }, [animationDuration, delayDuration, disabled, direction, isPaused, progress, yoyo]);

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.span
      ref={elementRef}
      className={`shiny-text ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
