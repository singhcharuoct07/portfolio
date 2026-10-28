import './page2.css'

const interests = ['React', 'JavaScript', 'Node.js', 'Full-Stack Development', 'AI/ML exploration']

const Page2 = () => (
  <main>
    <section id='about' className='about-section scroll-mt-8'>
      <div className='portfolio-content about-layout'>
        <div className='about-copy'>
          <p className='portfolio-eyebrow'>About Me</p>
          <h2 className='about-heading'>A curious builder, one problem at a time.</h2>
          <div className='about-prose'>
            <p>I'm a B.Tech student passionate about software development, problem-solving, and building practical technology solutions. I'm working toward a career in software engineering and exploring opportunities in AI/ML.</p>
            <p>Technology has always felt like the fastest path from an idea to something real. I enjoy solving algorithmic problems, learning new technologies, and turning ideas into useful applications.</p>
            <p>I'm a constant learner who enjoys exploring new tools, improving my technical skills, and building projects that solve real-world problems.</p>
          </div>
          <ul className='about-tags' aria-label='Skills and interests'>
            {interests.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className='about-portrait-wrap'>
          <img className='about-portrait' src='/charu-portrait.jfif' alt='Charu Singh' loading='lazy' />
        </div>
      </div>
    </section>

    <section id='skills' className='skills-section scroll-mt-8'>
      <div className='portfolio-content'>
        <h2 className='skills-title-accessible'>Skills &amp; technologies</h2>
        <div className='skills-grid'>
          <article className='skill-card'>
            <div className='skill-card-title'><span className='skill-icon' aria-hidden='true'><svg viewBox='0 0 24 24'><path d='m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16' /></svg></span><h3>Programming Languages</h3></div>
            <ul className='skill-tags'><li>JavaScript</li><li>TypeScript</li></ul>
          </article>
          <article className='skill-card'>
            <div className='skill-card-title'><span className='skill-icon' aria-hidden='true'><svg viewBox='0 0 24 24'><path d='m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5' /></svg></span><h3>Core Computer Science</h3></div>
            <ul className='skill-tags'><li>Data Structures &amp; Algorithms</li><li>Object-Oriented Programming</li><li>Operating Systems</li><li>DBMS</li></ul>
          </article>
          <article className='skill-card'>
            <div className='skill-card-title'><span className='skill-icon' aria-hidden='true'><svg viewBox='0 0 24 24'><circle cx='12' cy='12' r='9' /><path d='M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18' /></svg></span><h3>Web Development</h3></div>
            <ul className='skill-tags'><li>HTML</li><li>JavaScript</li><li>React</li><li>Next.js</li><li>Node.js</li><li>Express.js</li><li>MongoDB</li><li>Tailwind CSS</li></ul>
          </article>
          <article className='skill-card'>
            <div className='skill-card-title'><span className='skill-icon' aria-hidden='true'><svg viewBox='0 0 24 24'><path d='m14.7 6.3 3-3a5 5 0 0 1-6.5 6.5L5 16a2.1 2.1 0 0 0 3 3l6.2-6.2a5 5 0 0 1 6.5-6.5l-3 3-3-3Z' /><path d='m5 5 4 4' /></svg></span><h3>Developer Tools</h3></div>
            <ul className='skill-tags'><li>Git</li><li>GitHub</li><li>Vite</li><li>PostgreSQL</li><li>MySQL</li></ul>
          </article>
        </div>
      </div>
    </section>
  </main>
)

export default Page2
