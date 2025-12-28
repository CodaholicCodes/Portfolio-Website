import { FaJava, FaReacteurope } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5 } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {motion, useMotionValue} from "framer-motion"
import { useEffect, useRef, useState } from "react";

export default function Skills(){
  const skills=[
   {Icon : <FaJava />, name: 'Java' },
   {Icon : <RiTailwindCssFill />, name: 'Tailwind CSS' },
   {Icon : <FaHtml5 />, name: 'HTML' },
   {Icon : <SiMysql />, name: 'Mysql' },
   {Icon : <SiMongodb />, name: 'Mongo Db' },
   {Icon : <SiExpress />, name: 'Express.js' },
   {Icon : <FaNode />, name: 'Node.js' },
   {Icon : <FaReact />, name: 'React.js' },
   {Icon : <IoLogoJavascript />, name: 'Javascript' },
  ];


  const repeatedItems=[...skills,...skills];

const [dir,setDir]=useState(-1);
const [active,setActive]=useState(false);
const sectionRef=useRef(null);
const x=useMotionValue(0);
const touchY=useRef(null);
const trackRef=useRef(0);

useEffect(()=>{
  const el=sectionRef.current;
  if(!el) return;
  const observer=new IntersectionObserver(([entry])=>(
    setActive(entry.isInterSecting && entry.intersectionRatio > 0.1)
  ),{threshold : [0.1]});

  observer.observe(el);
  return ()=>observer.disconnect();
},[]);

useEffect(()=>{
  if(!active) return;
  const onWheel=(e)=>(setDir(e.deltaY > 0 ? -1 : 1))
  const onTouchStart=(e)=>(touchY.current=e.touches[0].clientY);
  const onTouchMove=(e)=>{
    if(touchY.current==null) return;
    const delta=e.touches[0].clientY-touchY.current;
    setDir(delta > 0 ? 1 : -1);
    touchY.current=e.touches[0].clientY;
  }

  window.addEventListener("wheel",onWheel ,{passive:true});
  window.addEventListener("touchstart",onTouchStart,{passive : true});
  window.addEventListener("touchmove",onTouchMove,{passive : true});
  return ()=>{
    window.removeEventListener("wheel",onWheel);
    window.removeEventListener("touchstart",onTouchStart);
    window.removeEventListener("touchmove",onTouchMove);
  
  }
},[active]);


useEffect(()=>{
  let id;
  let last=performance.now();
  const SPEED=80;
  const tick=(now)=>{
  const time=(now-last)/1000;
  last=now;
  let next=x.get()+(SPEED*time*dir);
  const loop=trackRef.current?.scrollWidth/2 || 0;
  if(loop){
  if(next <= -loop) next+=loop;
  if(next>=0) next-=loop;
  }
  x.set(next);
  id=requestAnimationFrame(tick);
  }
  id=requestAnimationFrame(tick);
  return ()=>cancelAnimationFrame(id);
},[dir,x]);



  return (
    <section 
    ref={sectionRef}
    id="skills" className="h-1/2 w-full bg-black text-white flex flex-col items-center justify-center relative pb-8">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
       <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
  </div>
  <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
  initial={{opacity : 0 ,y :-30}}
  whileInView={{opacity : 1,y:0}}
  transition={{duration : 0.5,delay : 0.1}}
  >
    My Skills
  </motion.h2>
  <motion.p className="mt-2 mb-8 text-white text-base sm:text-lg z-10"
    initial={{opacity : 0 ,y :-10}}
  whileInView={{opacity : 1,y:0}}
  transition={{duration : 0.5,delay : 0.1}}
  >
  Modern Technologies | Modern Applications
  </motion.p>

  <div className="relative w-full overflow-hidden">
    <motion.div className="flex gap-10 text-6xl text-[#1cd8d2]" ref={trackRef}
    style={{x,whiteSpace : "nowrap" , willChange : "transform"}}
    >
      {repeatedItems.map((item,idx)=>(
        <div key={idx} title={item.name} className="flex flex-col items-center gap-2 min-w-[120px]">
    <span className="hiver:scale-125 transition-transform duration-300">
      {item.Icon}
    </span>
    <p className="text-sm">
      {item.name}
    </p>
        </div>
      ))}
    </motion.div>
  </div>
    </section>
  )
}