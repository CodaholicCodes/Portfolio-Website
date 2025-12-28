import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import {motion} from "framer-motion"
export default function Footer(){
  
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

    return (
        <footer className="relative overflow-hidden bg-black">
     <div aria-hidden="true" className="pointer-events-none absolute inset-0 filter blur-3xl mix-blend-screen z-0" style={{background: 'radial-gradient(ellipse at 30% 70%, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0.12) 40%, rgba(16,185,129,0.06) 60%, rgba(0,0,0,0) 100%)'}} />
   <div aria-hidden="true" className="pointer-events-none absolute inset-0 filter blur-3xl mix-blend-screen z-0" style={{background: 'radial-gradient(ellipse at 70% 35%, rgba(13,88,202,0.25) 0%, rgba(6,182,212,0.10) 35%, rgba(0,0,0,0) 80%)'}} />

         <motion.div
         className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
           initial={{opacity : 0 , y:30}}
     whileInView={{opacity : 1, y: 0}}
     transition={{duration : 0.8 }}
         >
       <h1 className="text-white font-semibold leading-none select-none text-[clamp(3rem,5vw,14rem)] tracking-tighter  text-shadow-white "
       style={{
        padding : "0 3vw",
        textShadow : "0 2px 18px rgba(0,0,0,0.45)"
       }}
       >Kundan Singh</h1>

       <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>

       <div className="flex gap-5 text-2xl md:text-3xl ">
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
          className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
          >
         <Icon />
          </motion.a> 
        
        )
        )}
       </div>

        <p className="text-gray-300 italic max-w-xl ">"Code for Change"</p>
         <p className="text-xs text-gray-400">&copy;2026 Kundan Singh.All Rights reserved</p>
         </motion.div>
        </footer>
    )
}