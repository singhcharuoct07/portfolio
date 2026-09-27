import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiHtml5,
  SiJavascript,
  SiExpress,
  SiGit,
  SiGithub
} from 'react-icons/si'
import FolderFloat from '../component/FolderFloat'
import FoldText from '../component/FoldText'
import LogoLoop from '../component/LogoLoop'



const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },

  { node: <SiMysql />, title: 'SQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiHtml5 />, title: 'HTML', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' }
]

const Page3 = () => {
  return (

    <div id='project' className='min-h-screen bg-[#f7f4ef] px-5 py-16 text-slate-900'>
      <div className='mb-6 text-center'>
        <FoldText
          text='Project'
          splitBy='char'
          hinge='top'
          trigger='scroll'
          duration={0.65}
          stagger={0.045}
          ease='power3.out'
          perspective={700}
          creaseShading={0.55}
          fontSize='clamp(2.2rem, 5vw, 4rem)'
          fontWeight={800}
          color='#0f172a'
        />
      </div>
      <div className='mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-8'>
        <FolderFloat
          items={[
            {
              label: 'Interview-AI Preparation',
              value: 'Interview-AI Preparation',
              href: 'https://github.com/singhcharuoct07/InterviewAI-prep',
              target: '_blank',
              rel: 'noreferrer'
            }
          ]}
          label='Project Folder'
          sublabel='1 item'
          trigger='hover'
          closeOnSelect
          physics
          drift={0.5}
          onSelect={(value, index) => console.log(value, index)}
          folderColor='#f0e43e'
          frontColor='#f5d521'
          paperColor='#f5f5f5'
          itemColor='#f5f5f5'
          itemTextColor='#18181b'
          labelColor='#0b0a0a'
          width={280}
          height={200}
          radius={14}
          spread={180}
          lift={26}
          tilt={0}
          flapAngle={34}
          restAngle={16}
          openDuration={520}
          stagger={45}
          bounce={0.3}
        />

        <div >
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction='left'
            logoHeight={30}
            gap={30}
            hoverSpeed={1.5}
            scaleOnHover
            fadeOut
            fadeOutColor='#f7f4ef'
            ariaLabel='Technology stack'
          />
        </div>
      </div>
    </div>
  )
}

export default Page3
