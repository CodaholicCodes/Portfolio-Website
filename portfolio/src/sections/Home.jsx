import { useEffect, useMemo, useState } from 'react';
import ParticlesBackground from '../components/ParticlesBackground'
import { domMax, hover, motion } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import avator from "../assets/avator.png"

export default function Home(){
const roles=useMemo(()=>["Full Stack Developer","Software Developer","Web Developer"],[]);

const socialIcons = [
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kundan-singh-27b93327a" },
  { Icon: FaGithub, label: "github", href: "https://github.com/CodaholicCodes" },
  { Icon: SiLeetcode, label: "Leetcode", href: "https://leetcode.com/u/CodaholicKundan/" },
];

const glowVariants={
  initial : {scale : 1,y:0,filter: "drop-shadow(0 0 0 rgba(0,0,0,0))"},
  hover : {
    scale : 1.2 , y:-3 ,
    filter : "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",transition :{type :'spring',stiffness :300 ,damping : 15},
  },
  tap :{scale : 0.95 , y:0,transition :{duration : 0.08}}
}

const [index,setIndex]=useState(0);
const [subIndex,setSubIndex]=useState(0);
const [deleting,setDeleting]=useState(false);


useEffect(()=>{
  const currentRole=roles[index];
  const timeout=setTimeout(()=>{
  if(!deleting && subIndex < currentRole.length) setSubIndex(idx=>idx+1);
  else if(!deleting && subIndex === currentRole.length) setTimeout(()=>setDeleting(true),1200);
  else if(deleting && subIndex >0) setSubIndex(idx=>idx-1);
  else {
    setDeleting(false);
    setIndex(idx=>idx+1===roles.length ? 0 : idx+1);
  }
  },deleting ? 40 : 60);
  return ()=>clearTimeout(timeout); 
  },[subIndex,deleting,index,roles]
  )



  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">
    <ParticlesBackground />
     <div className="absolute inset-0">
    <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] 
     h-[70vw] sm:h-[50vw] md:h-[40vw] rounded-full
     max-w-[500px] max-h-[500px]
     bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
     opacity-30 sm:opacity-20 md:opacity-10 
     blur-[100px] sm:blur-[130px] md:blur-[150px]
     animate-pulse
    '></div>
    <div className='absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] 
     h-[70vw] sm:h-[50vw] md:h-[40vw] rounded-full
     max-w-[500px] max-h-[500px]
     bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
     opacity-30 sm:opacity-20 md:opacity-10 
     blur-[100px] sm:blur-[130px] md:blur-[150px]
     animate-pulse delay-500
    '></div>
     </div>

    <div className='relative z-10 h-full w-full max-w-7xl mx-auto px-6 lg:px-30 grid grid-cols-1 lg:grid-cols-2'>
      <div className='flex flex-col justify-center h-full text-center lg:text-left relative'>
   <div className='w-full lg:py-24 mx-auto max-w-[48rem]'>
     <motion.div className='mb-3 text-xl sm:text-2xl lg:text-4xl md:text-3xl font-semibold text-white tracking-wide min-h-[1.6em]'
     initial={{ opacity: 0, y: 12 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     >
      <span>
        {roles[index].substring(0,subIndex)}
      </span>
      <span className='inline-block w-[2px] ml-1 bg-white align-middle animate-pulse h-[1em]'
      >

      </span>
     </motion.div>

     <motion.h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bf8f] via-[#00bf8f] to-[#302b63] drop-shadow-lg'
     initial={{opacity:0, y: 40}}
     animate={{opacity:1 ,y:0}}
     transition={{duration : 1}}
     >
      Hello I'm
      <br />
      <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl  lg:text-8xl lg:whitespace-nowrap'>Kundan Singh</span>
     </motion.h1>


      <motion.p className='mt-6 text-base text-lg sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 '
      initial={{opacity:0 , y:20}}
      animate={{opacity:1 , y:0}}
      transition={{duration:0.8 , delay : 0.4}}
      >
        For me, coding is more than a technical skill—it is a way to innovate, improve, and contribute through purposeful engineering.
      </motion.p>

      <motion.div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'
      initial={{opacity:0 }}
      animate={{opacity:1 }}
      transition={{delay : 0.8 ,duration:0.8}}
      >
        <a href="#projects" className='px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
        shadow-lg hover:scale-105 transition-all
        '>View My Work</a>
        <a href="/Resume.pdf"
        download
        className='px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:bg-gray-200 hover:scale-105 transition-all shadow-lg '
        >My Resume</a>
      </motion.div>


      <div className='mt-10 flex  justify-center lg:justify-start gap-5 text-2xl md:text-3xl '>
        {socialIcons.map(({Icon,label,href},idx)=>(
          <motion.a 
          href={href}
          key={label}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-gray-300"
          >
         <Icon />
          </motion.a> 
        
        )
        )}

      </div>
   </div>
      </div>
  


  <div className='relative hidden lg:block'>

    <div
    className='absolute top-1/2 -translate-y-1/2 pointer-events-none'
    style={{
      right : "10px" , width : "min(22vw,410px)" , height : "min(40vw,760px)" , borderRadius : "50%",
      filter : "blur(80px)" , opacity : 0.45 ,
      background : "conic-gradient(from 0deg, rgba(28,216,210,0.85), rgba(0,191,143,0.75), rgba(48,43,99,0.6))"
    }}
    />

    <motion.img src={avator} alt="Kundan avatar" 
        className='absolute top-1/2 pointer-events-none object-contain select-none -translate-y-1/2 z-20'
        style={{
      right: "-40px",width : "min(45vw,780px)" , maxHeight : "90vh"
    }}
    initial={{opacity : 0 , y : 40 , scale: 0.98}}
    animate={{opacity : 1 , y:0 , scale :1}}
    transition={{delay : 0.2 , duration : 0.8}}
  
    />
  </div>

    </div>

        </section>
  )
}