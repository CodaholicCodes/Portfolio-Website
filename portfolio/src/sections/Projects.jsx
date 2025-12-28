import { useEffect, useMemo, useRef, useState } from "react"
import {useScroll ,  useMotionValueEvent , AnimatePresence,motion} from "framer-motion";
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
const useIsMobile=(query="(max-width : 639px)")=>{
  const [isMobile,setisMobile]=useState(window.matchMedia(query).matches);
  useEffect(()=>{
    if(typeof window ==="undefined") return;
    const mql=window.matchMedia(query);
    const handler=(e)=>setisMobile(e.matches);
    mql.addEventListener("change",handler);
    return ()=>mql.removeEventListener("change",handler);
  },[query]);
  return isMobile;
}

export default function Projects(){
 const isMobile=useIsMobile();
 const sceneRef=useRef(null);
 const projectsArray=useMemo(()=>[
  {
    title : "Farishtaa",
    link : "https://farishtaa.com",
    bgColor : "#3884d3",
    image : isMobile ? img1 : img2
  },
   {
    title : "Farishtaa",
    link : "https://farishtaa.com",
    bgColor : "#0d4d3d",
    image : isMobile ? img1 : img2
  },
  
   {
    title : "Farishtaa",
    link : "https://farishtaa.com",
    bgColor : "#dc9317",
    image : isMobile ? img1 : img2
  }
 ],[isMobile]);
  const {scrollYProgress}=useScroll({
    target : sceneRef,
    offset : ["start start","end end"]
  });

  const thresholds=projectsArray.map((_,i)=>(i+1)/projectsArray.length);
  const [activeIndex,setActiveIndex]=useState(0);

  useMotionValueEvent(scrollYProgress,"change",(v)=>{
    const idx=thresholds.findIndex((t)=> v<=t);
    setActiveIndex(idx === -1 ? thresholds.length-1:idx)
  });

  const activeProject=projectsArray[activeIndex];
  return (
   <section id="projects" className="relative text-white"
   ref={sceneRef}
   style={{
  height : `${100*projectsArray.length}vh`,
  backgroundColor:activeProject.bgColor,
  transition : "background-color 400ms ease"
   }}
   >
    
  <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
    <h2 className={`text-3xl font-semibold z-10 text-center ${
      isMobile ? "mt-4" :"mt-8"
    }`}>
      Proof of Work
    </h2>
  <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
    {projectsArray.map((project,idx)=>(
      <div key={project.title}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20" :"opacity-0 z-0 sm:z-10"}`}
      style={{width : "85%" , maxWidth: "1200px"}}
      >
        <AnimatePresence mode="wait">
        {activeIndex===idx && (
          <motion.h3 key={project.title}
          initial={{opacity : 0 ,y:-30}}
          animate={{opacity : 1 ,y:0}}
          exit={{opacity : 0 ,y: 30}}
          transition={{duration : 0.5 , ease : "easeOut"}}
          className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" :""}`}
          style={{
            zIndex : 5,
            textAlign : isMobile ? "center" :"left",
          }}
          >
            {project.title}
          </motion.h3>
        )}
        </AnimatePresence>
        <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
          isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
        }h-[62vh] sm:h-[66vh]`}
        style={{zIndex : 10 , transition : "box-shadow 250ms ease"}}
        >
          <img src={project.image} alt="image"  
          className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl rounded-2xl"
          style={{
            position : "relative",
            zIndex : 10,
            filter : "drop-shadow(0,16px 40px rgba(0,0,0,0.65)",
            transition : "filter 200ms ease"
          }}
          loading="lazy"
          />
        </div>
      </div>
    ))}
  </div>
  <div className={`absolute ${isMobile ? "bottom-20 ":"bottom-10"}`}>
    <a href={activeProject.link} className="bg-white mt-4 text-black font-semibold rounded-lg px-6 py-3 inline-block hover:bg-gray-200 transition-all">View Project</a>
  </div>
  </div>

   </section>
  )
}