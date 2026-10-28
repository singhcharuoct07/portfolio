import Header from '../component/Header'
import FuturisticMascot from '../component/FuturisticMascot'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import './page1.css'

const Page1 = () => (
  <section id='home' className='home-hero'>
    <Header />

    <div className='home-hero__layout'>
      <div className='home-hero__content'>
        <p className='home-hero__eyebrow'>HII, I'M</p>
        <h1 className='home-hero__title'>
          Charu Singh
        </h1>
        

        <div className='home-hero__actions'>
          <a className='home-hero__button home-hero__button--primary' href='#project'>View My Work</a>
          <a className='home-hero__button home-hero__button--secondary' href='#contact'>Get In Touch</a>
          <a className='home-hero__button home-hero__button--resume' href='/resume12.pdf' target='_blank' rel='noreferrer'>Resume</a>
        </div>

        <div className='home-hero__socials' aria-label='Social links'>
          <a href='https://github.com/singhcharuoct07' target='_blank' rel='noreferrer' aria-label='GitHub profile'>
            <FaGithub aria-hidden='true' />
          </a>
          <a href='https://www.linkedin.com/in/charu-singh-0755a12a4/' target='_blank' rel='noreferrer' aria-label='LinkedIn profile'>
            <FaLinkedinIn aria-hidden='true' />
          </a>
        </div>
      </div>

      <div className='home-hero__mascot-wrap'>
        <FuturisticMascot />
      </div>
    </div>
  </section>
)

export default Page1
