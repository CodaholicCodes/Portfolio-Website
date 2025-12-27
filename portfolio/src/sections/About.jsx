import photo from '../assets/img.jpeg';
import {motion} from "framer-motion";

export default function About(){

const stats=[
  {label : "Experience" , value : "1+ years"},
  {label : "Speciality" , value : "Full Stack "},
  {label : "Focus" , value : "Software Development & Problem Solving"},
]

  const glows=[
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[120px] delay-300",
    "top-1/2 left-1/2 w-[220px] h-[220px] opacity-10 blur-[100px] -translate-x-1/2 -translate-y-1/2"
  ]
  
  return (
    <section id="about" 
    className="min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden relative">
  <div className="absolute inset-0 pointer-events-none z-0">
    {glows.map((glow, index) => (
      <div key={index} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${glow} z-0`} />
    ))}
  </div>
   <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
<motion.div className='flex flex-col md:flex-row items-center md:items-stretch gap-8'
  initial={{opacity:0,y:24}}
   whileInView={{opacity:1,y:0}}
   transition={{duration:0.6}}
   viewport={{once:true , amount:0.4}}
>
   <motion.div className='relative  w-[300px] h-[200px] md:w-[200px] m:h-[200px]
   rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]'
   whileHover={{scale: 1.02 }}
   transition={{type:"spring" , stiffness:400 ,damping : 10}}
   >
   <img src={photo} alt="prof" className='absolute inset-0' />
   </motion.div>
   <div className='flex flex-col text-center justify-center md:text-left flex-1'>
    <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>
      Kundan Singh
    </h2>
    <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>Full Stack Developer</p>
    <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>
      I am a MERN Full Stack Developer with experience in building scalable web applications using JavaScript and MongoDB. I also work with AI-powered features to enhance application functionality and user experience. With strong skills in Java, Data Structures, and Algorithms, I focus on writing clean, efficient, and impactful code while continuously learning new technologies.
    </p>
   <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
    {stats.map((stat,i)=>{
      return (
      <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
      initial={{opacity : 0,y:10}}
      whileInView={{opacity : 1, y:0}}
      transition={{delay :0.05*i , duration : 0.4}}
      viewport={{once:true ,amount: 0.3}}
      >
     <div className='text-gray-400 text-sm '>{stat.label}</div>
     <div  className='text-base font-semibold'>{stat.value}</div>
      </motion.div>
      )
    })}
   </div>
     <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
    <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black hover:bg-gray-200 transition px-5 py-3 font-semibold '>View Projects</a>
    <a href="#contact" className='inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 px-5 py-3 hover:bg-white/20'>Get in touch</a>
  </div>
   </div>


    </motion.div>

    <motion.div className='text-center md:text-left'
    initial={{opacity : 0, x:-30}}
    whileInView={{opacity:1 , x: 0}}
    transition={{duration : 0.6}}
    viewport={{once: true , amount:0.4}}
    >
     <h3 className='text-2xl font-bold text-white mb-3'>About Me</h3>
      <p className='text-gray-300 leading-relaxed text-base sm:text-lg'>
        I am a passionate software developer with a strong interest in building scalable and efficient applications. I enjoy problem solving and have a solid foundation in Data Structures and Algorithms, which I apply to write optimized and maintainable code. I work across the full stack and continuously learn new technologies to build impactful software solutions
      </p>
    </motion.div>
   </div>
    </section>
  )
}