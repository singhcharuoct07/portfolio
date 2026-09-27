import { motion } from 'motion/react'
import ShinyText from '../component/ShinyText'

const highlights = [
  { label: 'Projects', value: '12+' },
  { label: 'Experience', value: '2+ yrs' },
  { label: 'Focus', value: 'Full Stack' },
]



const Page2 = () => {
  return (
    <div id='about' className='min-h-screen bg-[#0f1115] px-5 py-16 text-white'>
      <div className='mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className='mb-10 flex items-center gap-3'
        >
          <span className='h-2.5 w-2.5 rounded-full bg-[#d9f7b0]' />
          <span className='text-xs font-semibold uppercase tracking-[0.5em] text-[#d9f7b0]'>About Me</span>
        </motion.div>

        <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className='text-4xl font-black leading-tight tracking-[-0.06em] md:text-6xl'>
              <ShinyText
                text='I create polished digital experiences that feel effortless.'
                color='#dfe7ff'
                shineColor='#e45eeb'
                speed={2.2}
                spread={120}
                direction='left'
                pauseOnHover={false}
              />
            </h2>

            <p className='mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg'>
              I’m <span className='font-semibold text-white'>Charu Singh</span>, a Computer Science Engineering student and aspiring Full-Stack Developer who loves turning ideas into interactive web experiences. I build with React, JavaScript, Node.js, and modern web technologies while continuously exploring AI and new ways to create useful products.
              </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              
            </div>

            <div className='mt-10 grid gap-4 sm:grid-cols-3'>
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='relative'
          >
            <div className='absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#d9f7b0]/20 blur-3xl' />
            <div className='absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-[#4ecdc4]/15 blur-3xl' />

            <div className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1b1f2a] via-[#111827] to-[#0b1220] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)]'>
              <div className='rounded-[1.5rem] border border-white/10 bg-[#f2efe8] p-5 text-black shadow-inner backdrop-blur-sm'>
                <div className='mb-5 flex items-center justify-between'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.35em] text-[#5a5147]'>Profile</p>
                    <h3 className='mt-2 text-2xl font-bold text-black'></h3>
                  </div>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#0e0e0e] text-xl font-bold text-[#f2efe8]'>C</div>
                </div>

                <div className='space-y-3 text-sm text-slate-700'>
                  <div className='flex flex-col items-start rounded-xl border border-black/10 bg-[#f7f4ee] px-4 py-3'>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c564f]'>College</span>
                    <span className='mt-1 font-semibold text-black'>ITS Engineering College (AKTU)</span>
                  </div>
                  <div className='flex flex-col items-start rounded-xl border border-black/10 bg-[#f7f4ee] px-4 py-3'>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c564f]'>Location</span>
                    <span className='mt-1 font-semibold text-black'>Greater Noida, Uttar Pradesh</span>
                  </div>
                  <div className='flex flex-col items-start rounded-xl border border-black/10 bg-[#f7f4ee] px-4 py-3'>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c564f]'>Resume</span>
                    <a
                      href='/resume11 (1).pdf'
                      target='_blank'
                      
                      className='mt-1 inline-flex rounded-full border border-black/10 bg-yellow-300 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-200'
                    >
                      Resume
                    </a>
                  </div>
                </div>
              </div>

             
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Page2
