import StaggeredMenu from './StaggeredMenu'

const Header = () => {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
    { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
    { label: 'Project', ariaLabel: 'Go to projects section', link: '#project' },
    { label: 'Resume', ariaLabel: 'Open resume', link: '/resume11 (1).pdf', target: '_blank', rel: 'noreferrer' },
    { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' }
  ]

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/singhcharuoct07' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/charu-singh-0755a12a4/' }
  ]

  return (
    <div className='fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6'>
      <StaggeredMenu
        position='right'
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor='#ffffff'
        openMenuButtonColor='#ffffff'
        changeMenuColorOnOpen={true}
        colors={['#B497CF', '#5227FF', '#7dd3fc']}
        accentColor='#8b5cf6'
        logoUrl=''
        logoText='C'
        className='portfolio-menu'
        isFixed={true}
      />
    </div>
  )
}

export default Header