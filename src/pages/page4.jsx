import { motion } from 'motion/react'
import MagnetLines from '../component/MagnetLines'
import GlassIcons from '../component/GlassIcons'

const contactItems = [
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
        <path d='M12 2C6.477 2 2 6.587 2 12.253c0 4.52 2.865 8.352 6.839 9.707.5.094.682-.22.682-.488 0-.239-.009-1.03-.014-1.868-2.782.617-3.37-1.364-3.37-1.364-.454-1.17-1.11-1.482-1.11-1.482-.908-.631.069-.619.069-.619 1.004.072 1.533 1.048 1.533 1.048.892 1.555 2.339 1.106 2.909.845.091-.657.349-1.106.634-1.359-2.221-.258-4.556-1.134-4.556-5.046 0-1.115.39-2.025 1.029-2.738-.103-.258-.446-1.3.099-2.707 0 0 .84-.274 2.75 1.048A9.41 9.41 0 0 1 12 6.84c.849 0 1.705.116 2.505.342 1.909-1.322 2.748-1.048 2.748-1.048.547 1.407.204 2.449.1 2.707.64.713 1.028 1.623 1.028 2.738 0 3.919-2.339 4.785-4.566 5.04.359.316.679.937.679 1.889 0 1.363-.012 2.463-.012 2.797 0 .272.179.588.688.486A10.259 10.259 0 0 0 22 12.253C22 6.587 17.523 2 12 2Z' />
      </svg>
    ),
    color: 'blue',
    label: 'GitHub',
    link: 'https://github.com/singhcharuoct07'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
        <path d='M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 9.83h2.88v9.67H5.5V9.83Zm4.68 0h2.76v1.32h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4v5.43h-2.88v-5.08c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68v5.17H10.18V9.83Z' />
      </svg>
    ),
    color: 'purple',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/charu-singh-0755a12a4/'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
        <path d='M7 3.5h7.5L18.5 7v13.5A1.5 1.5 0 0 1 17 22H7a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 7 3.5Z' />
        <path d='M14.5 3.5V8H18.5' />
        <path d='M8.5 11.5h7M8.5 15h7' />
      </svg>
    ),
    color: 'green',
    label: 'Resume',
    link: '/resume11 (1).pdf',
    target: '_blank'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='M3 7l9 6 9-6' />
      </svg>
    ),
    color: 'red',
    label: 'Email',
    link: 'https://mail.google.com/mail/?view=cm&fs=1&to=singhcharuoct07@gmail.com' 
  }
]

const Page4 = () => {
  return (
    <div id='contact' className='relative min-h-screen overflow-hidden bg-[#050816] px-4 py-8 text-white sm:px-5 sm:py-10'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_50%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_45%)]' />
      <div className='absolute inset-0 opacity-80'>
        <MagnetLines
          rows={7}
          columns={7}
          containerSize='min(70vmin, 520px)'
          lineColor='rgba(255,255,255,0.72)'
          lineWidth='0.9vmin'
          lineHeight='4.8vmin'
          baseAngle={0}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
      <div className='absolute inset-0 bg-black/20' />

      <div className='relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='w-full min-w-0 rounded-[2rem] border border-white/10 bg-slate-950/30 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.55)] backdrop-blur-md md:backdrop-blur-xl sm:p-8 md:p-10'
        >
          <div className='text-center'>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45 }}
              className='text-xs font-semibold uppercase tracking-[0.55em] text-sky-300'
            >
              Contact
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='mt-4 text-[clamp(2rem,8vw,3.75rem)] font-black leading-tight tracking-[-0.06em]'
            >
              {['Let’s', 'Connect.'].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                  className='mr-3 inline-block'
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className='mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg'
            >
              {['I’m', 'open', 'to', 'full-stack', 'development', 'roles,', 'freelance', 'projects,', 'and', 'product', 'collaborations.'].map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.75 }}
                  transition={{ duration: 0.4, delay: 0.18 + index * 0.07 }}
                  className='mr-2 inline-block'
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className='mt-10 flex justify-center'>
            <GlassIcons items={contactItems} />
          </div>

          <div className='mt-2 text-center'>
            
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Page4
