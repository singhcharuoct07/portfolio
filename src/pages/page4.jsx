import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedinIn, FaEnvelope, FaArrowUp, FaLocationDot, FaPaperPlane } from 'react-icons/fa6'
import './page4.css'

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
}
const emailJsEnvNames = {
  serviceId: 'VITE_EMAILJS_SERVICE_ID',
  templateId: 'VITE_EMAILJS_TEMPLATE_ID',
  publicKey: 'VITE_EMAILJS_PUBLIC_KEY'
}
const missingEmailJsVariables = Object.entries(emailJsConfig)
  .filter(([, value]) => !value?.trim())
  .map(([key]) => emailJsEnvNames[key])
const emailJsConfigured = missingEmailJsVariables.length === 0

const Page4 = () => {
  const [isSending, setIsSending] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const submissionInProgress = useRef(false)

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    if (submissionInProgress.current) return
    if (!form.reportValidity()) return

    if (!emailJsConfigured) {
      setFormStatus({
        type: 'error',
        message: `EmailJS is not configured. Missing: ${missingEmailJsVariables.join(', ')}. Add the values to .env.local and Vercel before sending.`
      })
      return
    }

    const data = new FormData(form)
    const templateParams = {
      from_name: data.get('name'),
      reply_to: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message')
    }

    submissionInProgress.current = true
    setIsSending(true)
    setFormStatus({ type: 'sending', message: 'Sending your message…' })

    try {
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, templateParams, { publicKey: emailJsConfig.publicKey })
      form.reset()
      setFormStatus({ type: 'success', message: 'Your message was sent successfully. Thank you for reaching out!' })
    } catch (error) {
      const errorDetail = error && typeof error === 'object' && 'text' in error && typeof error.text === 'string'
        ? error.text
        : error instanceof Error ? error.message : 'Please try again or email singhcharuoct07@gmail.com.'
      setFormStatus({ type: 'error', message: `Your message could not be sent: ${errorDetail}` })
    } finally {
      submissionInProgress.current = false
      setIsSending(false)
    }
  }

  return (
    <>
      <section id='education' className='education-section scroll-mt-8'>
        <div className='education-container'>
          <p className='portfolio-eyebrow'>Education</p>
          <h2 className='education-heading'>Academic background</h2>
          <div className='education-timeline'>
            <span className='education-marker' aria-hidden='true' />
            <article className='education-card'>
              <h3>Computer Science Engineering</h3>
              <p className='education-institution'>ITS Engineering College (AKTU)</p>
              <p className='education-status'>Currently pursuing</p>
              <p className='education-location'>Greater Noida, Uttar Pradesh</p>
            </article>
          </div>
        </div>
      </section>
      <section id='contact' className='scroll-mt-20 bg-white px-5 pt-12 pb-10 text-[#101a30] sm:px-8 sm:pt-[52px] sm:pb-10'>
        <div className='contact-container'>
          <header className='mb-14 text-left'>
            <h2 className='text-[32px] font-bold leading-tight tracking-[-0.04em] text-[#101a30]'>Let's build something together</h2>
            <p className='mt-4 max-w-2xl text-base leading-7 text-slate-600'>Have a role, project, or research idea in mind? I'd love to hear from you.</p>
          </header>
          <div className='contact-layout'>
            <aside className='contact-info-card flex flex-col rounded-[20px] border border-[#10192D] bg-[#10192D] p-6 text-white shadow-sm sm:p-9'>
              <div>
                <h3 className='text-2xl font-bold tracking-tight'>Get in touch</h3>
                <p className='mt-3 max-w-md text-[15px] leading-6 text-slate-300'>I'm open to full-stack development roles, freelance projects, and product collaborations.</p>
              </div>
              <div className='mt-8 space-y-4'>
                <a className='group flex min-h-14 items-center gap-4 text-white' href='mailto:singhcharuoct07@gmail.com' aria-label='Email Charu' title='Email Charu'><span className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#1b2942] text-sky-300'><FaEnvelope aria-hidden='true' /></span><span className='min-w-0'><span className='block text-xs text-slate-400'>Email</span><span className='break-all text-sm font-medium text-slate-100 sm:text-base'>singhcharuoct07@gmail.com</span></span></a>
                <div className='flex min-h-14 items-center gap-4'><span className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#1b2942] text-sky-300'><FaLocationDot aria-hidden='true' /></span><span><span className='block text-xs text-slate-400'>Location</span><span className='text-sm font-medium text-slate-100 sm:text-base'>Greater Noida, Uttar Pradesh</span></span></div>
              </div>
              <div className='mt-auto pt-8'>
                <div className='flex gap-2.5'>
                  <a className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1b2942] text-sky-200 transition hover:border-sky-300/60 hover:bg-[#243b5f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='https://github.com/singhcharuoct07' target='_blank' rel='noopener noreferrer' aria-label='GitHub profile'><FaGithub aria-hidden='true' /></a>
                  <a className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1b2942] text-sky-200 transition hover:border-sky-300/60 hover:bg-[#243b5f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='https://www.linkedin.com/in/charu-singh-0755a12a4/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn profile'><FaLinkedinIn aria-hidden='true' /></a>
                  <a className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1b2942] text-sky-200 transition hover:border-sky-300/60 hover:bg-[#243b5f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='mailto:singhcharuoct07@gmail.com' aria-label='Email Charu' title='Email Charu'><FaEnvelope aria-hidden='true' /></a>
                </div>
              </div>
            </aside>
            <form className='contact-form-card rounded-[20px] border border-[#d9e2ee] bg-white p-6 text-[#101a30] shadow-sm sm:p-8' onSubmit={handleSubmit}>
              <div className='contact-form-rows'>
                <label className='contact-field' htmlFor='contact-name'>Name<input className='contact-control' id='contact-name' name='name' autoComplete='name' placeholder='Your name' required /></label>
                <label className='contact-field' htmlFor='contact-email'>Email<input className='contact-control' id='contact-email' name='email' type='email' autoComplete='email' placeholder='you@example.com' required /></label>
                <label className='contact-field contact-field--wide' htmlFor='contact-subject'>Subject<input className='contact-control' id='contact-subject' name='subject' placeholder="What's this about?" required /></label>
                <label className='contact-field contact-field--wide' htmlFor='contact-message'>Message<textarea className='contact-control contact-message' id='contact-message' name='message' placeholder='Tell me a bit more...' required /></label>
              </div>
              <button className='contact-submit mt-5' type='submit' disabled={isSending} aria-busy={isSending}>
                {isSending ? <><span className='contact-spinner' aria-hidden='true' /> <span>Sending…</span></> : <><FaPaperPlane aria-hidden='true' /> <span>Send Message</span></>}
              </button>
              <p className='mt-3 text-center text-xs leading-5 text-slate-500'>
                {emailJsConfigured ? "I'll get back to you as soon as possible." : `Email delivery is disabled. Missing: ${missingEmailJsVariables.join(', ')}. Configure these values in .env.local and Vercel; see the EmailJS setup in README.`}
              </p>
              {formStatus.message && <p className={`contact-form-status contact-form-status--${formStatus.type}`} role='status' aria-live='polite'>{formStatus.message}</p>}
            </form>
          </div>
        </div>
      </section>
      <footer className='border-t border-white/10 bg-[#070b18] px-5 py-8 text-white sm:px-8 sm:py-9'>
        <div className='mx-auto max-w-6xl'>
          <div className='flex flex-col items-center justify-between gap-5 sm:flex-row'>
            <a className='text-xl font-bold tracking-tight text-white no-underline transition hover:text-slate-200' href='#home' aria-label='Charu.dev, back to home'>Charu<span className='text-sky-400'>.</span>dev</a>
            <nav className='flex items-center gap-2' aria-label='Footer links'>
              <a className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='https://github.com/singhcharuoct07' target='_blank' rel='noopener noreferrer' aria-label='GitHub profile'><FaGithub aria-hidden='true' /></a>
              <a className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='https://www.linkedin.com/in/charu-singh-0755a12a4/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn profile'><FaLinkedinIn aria-hidden='true' /></a>
              <a className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' href='mailto:singhcharuoct07@gmail.com' aria-label='Email Charu' title='Email Charu'><FaEnvelope aria-hidden='true' /></a>
            </nav>
          </div>
          <div className='mt-6 border-t border-white/10 pt-5 text-center'>
            <p className='text-sm text-slate-400'>© {new Date().getFullYear()} Charu Singh <span className='mx-1 text-sky-400' aria-hidden='true'>·</span> Designed &amp; Developed by Charu Singh</p>
          </div>
        </div>
        <button className='fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-300/25 bg-[#101a30] text-sky-200 shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-[#172747] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300' type='button' aria-label='Back to top' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp aria-hidden='true' />
        </button>
      </footer>
    </>
  )
}

export default Page4
