import { useState } from "react"

const isMobile=(query="(max-width : 639px)")=>{
  const [isMobile,setisMobile]=useState(window.matchMedia(query).matches);
  
}

export default function Projects(){
  
  return (
   <section id="projects" className="relative text-white">

   </section>
  )
}