import { useRef, useEffect } from 'react'
import './MagnetLines.css'

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll('span'))
    let centers = []
    let pointer = null
    let frameId = null
    let isActive = false

    const updateCenters = () => {
      const containerRect = container.getBoundingClientRect()
      centers = items.map(item => {
        const rect = item.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        }
      })
    }

    const update = () => {
      frameId = null
      if (!isActive || !pointer) return
      const containerRect = container.getBoundingClientRect()
      const pointerX = pointer.x - containerRect.left
      const pointerY = pointer.y - containerRect.top

      items.forEach((item, index) => {
        const { x, y } = centers[index]
        const angle = Math.atan2(pointerY - y, pointerX - x) * (180 / Math.PI)
        item.style.setProperty('--rotate', `${angle}deg`)
      })
    }

    const scheduleUpdate = event => {
      pointer = { x: event.clientX, y: event.clientY }
      if (frameId === null) frameId = requestAnimationFrame(update)
    }

    const setActive = active => {
      if (isActive === active) return
      isActive = active
      if (active) {
        updateCenters()
        window.addEventListener('pointermove', scheduleUpdate, { passive: true })
      } else {
        window.removeEventListener('pointermove', scheduleUpdate)
        if (frameId !== null) {
          cancelAnimationFrame(frameId)
          frameId = null
        }
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && !document.hidden)
    })
    observer.observe(container)

    const resizeObserver = new ResizeObserver(updateCenters)
    resizeObserver.observe(container)
    const handleVisibilityChange = () => setActive(!document.hidden && container.getBoundingClientRect().bottom > 0 && container.getBoundingClientRect().top < window.innerHeight)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pointermove', scheduleUpdate)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [rows, columns])

  const total = rows * columns
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight
      }}
    />
  ))

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  )
}
