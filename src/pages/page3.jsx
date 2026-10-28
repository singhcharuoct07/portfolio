import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'

const Page3 = () => (
  <section id='project' className='bg-[#f7f4ef] px-5 py-20 text-slate-950 sm:px-8 sm:py-24'>
    <div className='mx-auto max-w-6xl'>
      <p className='mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-violet-700'>Selected work</p>
      <div className='mb-10 flex flex-wrap items-end justify-between gap-4'><h2 className='text-4xl font-bold tracking-[-0.04em] sm:text-5xl'>Projects</h2><p className='max-w-md text-sm leading-6 text-slate-600'>A project from my portfolio, built around practical interview preparation.</p></div>
      <article className='grid overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm md:grid-cols-[0.8fr_1.2fr]'>
        <div className='flex min-h-52 items-center justify-center bg-[#e9e2ff] p-8'><div className='max-w-xs rounded-2xl border border-violet-900/10 bg-white/80 p-6 shadow-lg shadow-violet-900/10'><span className='text-xs font-semibold uppercase tracking-[0.22em] text-violet-700'>Project 01</span><h3 className='mt-3 text-2xl font-bold'>InterviewAI Prep</h3><p className='mt-2 text-sm text-slate-600'>Prepare for your next interview.</p></div></div>
        <div className='flex flex-col justify-center p-6 sm:p-9'><p className='text-xs font-semibold uppercase tracking-[0.25em] text-violet-700'>Interview-AI Preparation</p><h3 className='mt-3 text-2xl font-bold tracking-tight'>InterviewAI Prep</h3><p className='mt-4 max-w-xl leading-7 text-slate-600'>An interview preparation project. Explore the repository for project details and implementation.</p><div className='mt-5 flex flex-wrap gap-2'><span className='rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700'>React</span><span className='rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700'>JavaScript</span><span className='rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700'>AI</span></div><div className='mt-7'><a className='inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700' href='https://github.com/singhcharuoct07/InterviewAI-prep' target='_blank' rel='noopener noreferrer'><FaGithub aria-hidden='true' /> View on GitHub <FaArrowUpRightFromSquare aria-hidden='true' className='text-xs' /></a></div></div>
      </article>
    </div>
  </section>
)

export default Page3
