import { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import './VariableProximity.css';

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return undefined;

    const updatePosition = (x, y) => {
      const rect = container.getBoundingClientRect();
      positionRef.current = { x: x - rect.left, y: y - rect.top };
    };

    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = ev => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    container.addEventListener('pointermove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      container.removeEventListener('pointermove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return undefined;

    let frameId = null;

    const update = () => {
      frameId = null;
      const container = containerRef?.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
      lastPositionRef.current = { x, y };

      letterRefs.current.forEach(letterRef => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        const distance = Math.sqrt((x - letterCenterX) ** 2 + (y - letterCenterY) ** 2);

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        const falloffValue = falloff === 'exponential'
          ? norm ** 2
          : falloff === 'gaussian'
            ? Math.exp(-((distance / (radius / 2)) ** 2) / 2)
            : norm;
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        letterRef.style.fontVariationSettings = newSettings;
      });
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = requestAnimationFrame(update);
    };

    const resetLetters = () => {
      lastPositionRef.current = { x: null, y: null };
      letterRefs.current.forEach(letterRef => {
        if (letterRef) letterRef.style.fontVariationSettings = fromFontVariationSettings;
      });
    };

    scheduleUpdate();
    container.addEventListener('pointermove', scheduleUpdate);
    container.addEventListener('touchmove', scheduleUpdate, { passive: true });
    container.addEventListener('pointerleave', resetLetters);
    return () => {
      container.removeEventListener('pointermove', scheduleUpdate);
      container.removeEventListener('touchmove', scheduleUpdate);
      container.removeEventListener('pointerleave', resetLetters);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [containerRef, falloff, fromFontVariationSettings, mousePositionRef, parsedSettings, radius]);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                className='variable-proximity__letter'
                style={{
                  display: 'inline-block',
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
