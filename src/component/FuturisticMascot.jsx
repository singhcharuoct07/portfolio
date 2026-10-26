import { useEffect, useRef } from 'react'
import './FuturisticMascot.css'

const FuturisticMascot = () => {
  const mascotRef = useRef(null)
  const faceAreaRef = useRef(null)
  const headRef = useRef(null)
  const pupilsRef = useRef([])

  useEffect(() => {
    const mascot = mascotRef.current
    const faceArea = faceAreaRef.current
    if (!mascot || !faceArea) return undefined

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let blinkTimer = 0
    let blinkResetTimer = 0
    let idleTimer = 0
    let actionTimer = 0
    let nodTimer = 0
    let actionUntil = 0
    let hoveredInteractive = null
    const current = { x: 0, y: 0, tilt: 0, nod: 0 }
    const target = { x: 0, y: 0, tilt: 0, nod: 0 }

    const animate = () => {
      frame = 0
      const easing = preference.matches ? 1 : 0.22
      current.x += (target.x - current.x) * easing
      current.y += (target.y - current.y) * easing
      current.tilt += (target.tilt - current.tilt) * easing
      current.nod += (target.nod - current.nod) * easing

      pupilsRef.current.forEach(pupil => {
        pupil?.setAttribute('transform', `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`)
      })
      headRef.current?.setAttribute('transform', `translate(0 ${current.nod.toFixed(2)}) rotate(${current.tilt.toFixed(2)} 180 180)`)

      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1 || Math.abs(target.tilt - current.tilt) > 0.1 || Math.abs(target.nod - current.nod) > 0.1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    const scheduleFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(animate)
    }

    const setExpression = expression => {
      mascot.dataset.expression = expression
    }

    const resetPose = () => {
      target.x = 0
      target.y = 0
      target.tilt = 0
      target.nod = 0
      setExpression('idle')
      scheduleFrame()
    }

    const aim = (nx, ny) => {
      // Keep the pupils inside the eye whites even at diagonal extremes.
      const x = nx * 9
      const y = ny * 10
      const distance = Math.hypot(x, y)
      const scale = distance > 10 ? 10 / distance : 1
      target.x = x * scale
      target.y = y * scale
      target.tilt = nx * 4
      scheduleFrame()
    }

    const lookAtElement = element => {
      const face = faceArea.getBoundingClientRect()
      const bounds = element?.getBoundingClientRect?.()
      if (!face.width || !face.height || !bounds) return
      const nx = Math.max(-1, Math.min(1, ((bounds.left + bounds.width / 2 - face.left) / face.width) * 2 - 1))
      const ny = Math.max(-1, Math.min(1, ((bounds.top + bounds.height / 2 - face.top) / face.height) * 2 - 1))
      aim(nx, ny)
    }

    const showAction = (expression, element, duration = 1250, nod = false) => {
      window.clearTimeout(actionTimer)
      actionUntil = Date.now() + duration
      setExpression(expression)
      if (element) lookAtElement(element)
      if (nod) {
        window.clearTimeout(nodTimer)
        target.nod = -3
        nodTimer = window.setTimeout(() => { target.nod = 0; scheduleFrame() }, 240)
      }
      actionTimer = window.setTimeout(() => {
        if (!hoveredInteractive) resetPose()
        actionUntil = 0
      }, duration)
    }

    const interactiveSelector = 'a, button, [role="button"], input, select, textarea'
    const handleInteractiveOver = event => {
      if (!event.isTrusted || event.pointerType === 'touch') return
      const element = event.target.closest?.(interactiveSelector)
      if (!element || event.relatedTarget?.closest?.(interactiveSelector) === element) return
      hoveredInteractive = element
      setExpression('curious')
      lookAtElement(element)
    }

    const handleInteractiveOut = event => {
      if (!event.isTrusted || event.pointerType === 'touch') return
      const element = event.target.closest?.(interactiveSelector)
      if (!element || (event.relatedTarget && element.contains(event.relatedTarget))) return
      if (hoveredInteractive === element) hoveredInteractive = null
      if (!hoveredInteractive && Date.now() >= actionUntil) resetPose()
    }

    const handleDocumentClick = event => {
      if (!event.isTrusted) return
      const targetElement = event.target instanceof Element ? event.target : null
      if (!targetElement) return
      const hero = targetElement.closest('.home-hero')
      const interactive = targetElement.closest(interactiveSelector)
      if (interactive?.closest('.folder-float, [data-project-card], [data-interactive-card], .project-card')) {
        showAction('interested', interactive, 1300)
        return
      }
      if (!hero) return
      if (!interactive) {
        hoveredInteractive = null
        window.clearTimeout(actionTimer)
        actionUntil = 0
        resetPose()
        return
      }

      const inHero = interactive.closest('.home-hero')
      if (interactive.matches('.home-hero__button--primary')) showAction('excited', interactive, 1500)
      else if (interactive.matches('.home-hero__button--secondary')) showAction('friendly', interactive, 1350)
      else if (interactive.matches('.home-hero__button--resume')) showAction('confident', interactive, 1450, true)
      else if (interactive.matches('.home-hero__socials a, .sm-socials-link')) showAction('wink', interactive, 950)
      else if (interactive.matches('.sm-panel-item')) showAction('curious', interactive, 1200)
      else if (inHero) showAction('curious', interactive, 1100)
    }

    const handlePointerMove = event => {
      if (event.pointerType === 'touch') return

      window.clearTimeout(idleTimer)

      const bounds = faceArea.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return

      const nx = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const ny = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
      aim(nx, ny)

      const closeToFace = Math.hypot(nx, ny) < 0.55
      setExpression(closeToFace ? 'excited' : ny < -0.32 ? 'curious' : ny > 0.32 ? 'thinking' : 'idle')
      scheduleFrame()
      idleTimer = window.setTimeout(resetPose, 1500)
    }

    const handlePointerLeave = () => {
      window.clearTimeout(idleTimer)
      resetPose()
    }

    const blink = () => {
      if (preference.matches) return
      mascot.dataset.blink = 'true'
      window.clearTimeout(blinkResetTimer)
      blinkResetTimer = window.setTimeout(() => {
        delete mascot.dataset.blink
      }, 150)
      blinkTimer = window.setTimeout(blink, 2600 + Math.random() * 2600)
    }

    const handleMotionPreference = () => {
      window.clearTimeout(blinkTimer)
      if (preference.matches) {
        delete mascot.dataset.blink
        resetPose()
      } else {
        blinkTimer = window.setTimeout(blink, 1800)
      }
    }

    mascot.addEventListener('pointermove', handlePointerMove, { passive: true })
    mascot.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    document.addEventListener('pointerover', handleInteractiveOver, true)
    document.addEventListener('pointerout', handleInteractiveOut, true)
    document.addEventListener('click', handleDocumentClick, true)
    preference.addEventListener('change', handleMotionPreference)
    if (!preference.matches) blinkTimer = window.setTimeout(blink, 1800)

    return () => {
      mascot.removeEventListener('pointermove', handlePointerMove)
      mascot.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerover', handleInteractiveOver, true)
      document.removeEventListener('pointerout', handleInteractiveOut, true)
      document.removeEventListener('click', handleDocumentClick, true)
      preference.removeEventListener('change', handleMotionPreference)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(blinkTimer)
      window.clearTimeout(blinkResetTimer)
      window.clearTimeout(idleTimer)
      window.clearTimeout(actionTimer)
      window.clearTimeout(nodTimer)
    }
  }, [])

  return (
    <svg
      ref={mascotRef}
      className='robot-mascot'
      viewBox='0 0 360 440'
      role='img'
      aria-label='Interactive friendly robot mascot'
      data-expression='idle'
    >
      <defs>
        <linearGradient id='robot-shell' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#ffffff' />
          <stop offset='0.48' stopColor='#ded8ff' />
          <stop offset='1' stopColor='#9e8de7' />
        </linearGradient>
        <linearGradient id='robot-lilac' x1='0' y1='0' x2='0.9' y2='1'>
          <stop offset='0' stopColor='#d8caff' />
          <stop offset='1' stopColor='#8c71e8' />
        </linearGradient>
        <linearGradient id='robot-screen' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#24204b' />
          <stop offset='1' stopColor='#100f2b' />
        </linearGradient>
        <linearGradient id='robot-glow' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#d8c5ff' />
          <stop offset='1' stopColor='#8f69f1' />
        </linearGradient>
        <filter id='robot-shadow' x='-30%' y='-20%' width='160%' height='160%'>
          <feDropShadow dx='0' dy='15' stdDeviation='14' floodColor='#070616' floodOpacity='0.42' />
        </filter>
        <radialGradient id='robot-halo'>
          <stop offset='0' stopColor='#8e6cf6' stopOpacity='0.35' />
          <stop offset='1' stopColor='#8e6cf6' stopOpacity='0' />
        </radialGradient>
      </defs>

      <ellipse className='robot-halo' cx='180' cy='228' rx='175' ry='195' fill='url(#robot-halo)' />
      <ellipse cx='180' cy='416' rx='93' ry='13' fill='#080719' opacity='0.7' />

      <g className='robot-body' filter='url(#robot-shadow)'>
        <path d='M133 294h94l12 38-22 24h-74l-22-24z' fill='url(#robot-lilac)' stroke='#f1edff' strokeWidth='3' />
        <path d='M90 400c3-42 26-68 64-76l26 20 26-20c38 8 61 34 64 76l-8 13H98z' fill='url(#robot-shell)' stroke='#f4f0ff' strokeWidth='4' />
        <path d='M116 390c4-23 17-38 38-45l26 20 26-20c21 7 34 22 38 45' fill='none' stroke='#a393e8' strokeWidth='4' strokeLinecap='round' />
        <path d='M170 348l10-9 10 9-10 14z' fill='url(#robot-glow)' />
        <circle cx='180' cy='383' r='5' fill='#8b6ff0' />
        <circle cx='157' cy='383' r='3' fill='#c1b4f7' />
        <circle cx='203' cy='383' r='3' fill='#c1b4f7' />
      </g>

      <g ref={headRef} className='robot-head' transform='rotate(0 180 180)' filter='url(#robot-shadow)'>
        <path d='M99 132c-1-47 30-81 81-81s82 34 81 81v105c0 32-23 56-55 56h-52c-32 0-55-24-55-56z' fill='url(#robot-shell)' stroke='#f5f1ff' strokeWidth='4' />

        <path d='M94 143c-22 10-30 32-28 70 2 31 13 53 34 63l12-19V145z' fill='url(#robot-lilac)' stroke='#d8d0ff' strokeWidth='4' />
        <path d='M266 143c22 10 30 32 28 70-2 31-13 53-34 63l-12-19V145z' fill='url(#robot-lilac)' stroke='#d8d0ff' strokeWidth='4' />
        <path d='M77 178c-14 0-24 10-24 24v13c0 14 10 24 24 24h11v-61z' fill='#aa94f3' stroke='#eeeaff' strokeWidth='4' />
        <path d='M283 178c14 0 24 10 24 24v13c0 14-10 24-24 24h-11v-61z' fill='#aa94f3' stroke='#eeeaff' strokeWidth='4' />
        <rect x='59' y='190' width='28' height='17' rx='8.5' fill='#e4dcff' />
        <rect x='273' y='190' width='28' height='17' rx='8.5' fill='#e4dcff' />
        <circle cx='73' cy='198.5' r='4' fill='#8d70ed' />
        <circle cx='287' cy='198.5' r='4' fill='#8d70ed' />

        <path d='M100 132c1-44 32-73 80-73 27 0 49 11 63 31-17-8-32-9-45-5 5 12 5 24 1 35-20-15-39-19-60-12-14 5-25 14-39 31z' fill='url(#robot-lilac)' stroke='#f5f1ff' strokeWidth='4' strokeLinejoin='round' />
        <path d='M111 122c13-20 29-29 47-31' fill='none' stroke='#f7f4ff' strokeWidth='5' strokeLinecap='round' opacity='0.8' />
        <path d='M236 121c-4-13-12-22-23-28' fill='none' stroke='#8e76e6' strokeWidth='4' strokeLinecap='round' opacity='0.75' />

        <rect x='103' y='126' width='154' height='129' rx='47' fill='url(#robot-screen)' stroke='#ede8ff' strokeWidth='4' />
        <path d='M120 143c18-12 38-17 60-17s42 5 60 17' fill='none' stroke='#9e8aff' strokeWidth='2' opacity='0.5' />
        <ellipse ref={faceAreaRef} data-face-tracking='true' cx='180' cy='181' rx='75' ry='53' fill='transparent' pointerEvents='none' />

        <path className='robot-brow robot-brow-left' d='M127 158q16-10 31 0' fill='none' stroke='#d7c9ff' strokeWidth='4' strokeLinecap='round' />
        <path className='robot-brow robot-brow-right' d='M202 158q16-10 31 0' fill='none' stroke='#d7c9ff' strokeWidth='4' strokeLinecap='round' />

        {[0, 1].map((index) => {
          const eyeX = index === 0 ? 145 : 215
          return (
            <g className={`robot-eye ${index === 0 ? 'robot-eye-left' : 'robot-eye-right'}`} key={index}>
              <ellipse className='robot-eye-white' cx={eyeX} cy='182' rx='23' ry='28' fill='#fffaff' />
              <g ref={element => { pupilsRef.current[index] = element }} transform='translate(0 0)'>
                <ellipse cx={eyeX} cy='183' rx='11' ry='16' fill='#8d70ed' />
                <ellipse cx={eyeX} cy='184' rx='6' ry='11' fill='#24204b' />
                <circle cx={eyeX - 3} cy='177' r='3.5' fill='white' />
                <circle cx={eyeX + 4} cy='189' r='1.7' fill='#d9d0ff' />
              </g>
              <path className='robot-eye-smile' d={`M${eyeX - 18} 183q18 15 36 0`} />
              <ellipse className='robot-eyelid' cx={eyeX} cy='182' rx='23' ry='28' fill='#c8b8ff' />
            </g>
          )
        })}

        <ellipse className='robot-blush robot-blush-left' cx='119' cy='211' rx='10' ry='5' fill='#da91dc' />
        <ellipse className='robot-blush robot-blush-right' cx='241' cy='211' rx='10' ry='5' fill='#da91dc' />
        <path className='robot-mouth robot-mouth-neutral' d='M165 226q15 10 30 0' fill='none' stroke='#d9caff' strokeWidth='4' strokeLinecap='round' />
        <path className='robot-mouth robot-mouth-happy' d='M163 220q17 25 34 0' fill='none' stroke='#f2b8e8' strokeWidth='4' strokeLinecap='round' />
        <path className='robot-mouth robot-mouth-thoughtful' d='M166 229q13-3 28 1' fill='none' stroke='#d9caff' strokeWidth='4' strokeLinecap='round' />
        <path className='robot-mouth robot-mouth-friendly' d='M165 224q15 17 30 0' fill='none' stroke='#f2b8e8' strokeWidth='4' strokeLinecap='round' />
        <path className='robot-mouth robot-mouth-confident' d='M166 225q16 12 30-1' fill='none' stroke='#e6d8ff' strokeWidth='4' strokeLinecap='round' />
        <path d='M113 238q12 10 26 10M247 238q-12 10-26 10' fill='none' stroke='#b4a4f0' strokeWidth='3' strokeLinecap='round' opacity='0.65' />
      </g>
    </svg>
  )
}

export default FuturisticMascot
