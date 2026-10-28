import { useEffect, useState } from 'react'
import './Header.css'

const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'project'],
  ['Education', 'education'],
  ['Contact', 'contact']
]

const Header = () => {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.4] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className='site-nav'>
      <a className='site-nav__brand' href='#home' aria-label='Charu Singh home'>CS<span>.</span></a>
      <button className='site-nav__toggle' type='button' aria-expanded={open} aria-controls='site-nav-links' aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}>
        <span /><span /><span />
      </button>
      <nav id='site-nav-links' className={`site-nav__links${open ? ' is-open' : ''}`} aria-label='Main navigation'>
        {links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  )
}

export default Header
