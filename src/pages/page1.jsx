import { useRef } from 'react'
import Header from '../component/Header'
import VariableProximity from '../component/VariableProximity'
import Particles from '../component/Particles'

const page1 = () => {
  const containerRef = useRef(null)

  return (
    <div id='home' className='h-screen bg-white px-5 py-5 p-5'>
      <div ref={containerRef} className='relative h-full w-full overflow-hidden rounded-[2rem]'>
        <div className='absolute inset-0 bg-[#050816]' />
        <div className='absolute inset-0'>
          <Particles
            particleColors={['#ffffff']}
            particleCount={180}
            particleSpread={10}
            speed={0.12}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            particleHoverFactor={1.2}
          />
        </div>
        <div className='absolute inset-0 bg-black/20' />
        <Header />

        <div className='absolute bottom-20 left-20 z-10 w-[min(90%,11000px)]'>
          <div className='text-3xl font-black tracking-tight text-white md:text-5xl'>Hi, I am</div>

          <div className='mt-2 text-[clamp(3rem,6vw,8rem)] leading-[0.9] tracking-[-0.08em] text-white'>
            <VariableProximity
              label='Charu Singh'
              className='inline-block font-black text-white'
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={160}
              falloff='linear'
            />
          </div>

          <div className='mt-3 flex items-center bg-none justify-between gap-4'>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default page1