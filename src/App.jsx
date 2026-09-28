import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Page1 from './pages/page1'

const Page2 = lazy(() => import('./pages/page2'))
const Page3 = lazy(() => import('./pages/page3'))
const Page4 = lazy(() => import('./pages/page4'))

const DeferredPage = ({ component: Component }) => {
  const sectionRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    if (!('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '800px 0px' }
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className='min-h-screen'>
      {shouldLoad && (
        <Suspense fallback={<div className='min-h-screen' />}>
          <Component />
        </Suspense>
      )}
    </div>
  )
}

const App = () => {
  return (
    <>
      <Page1 />
      <DeferredPage component={Page2} />
      <DeferredPage component={Page3} />
      <DeferredPage component={Page4} />
    </>
  )
}

export default App