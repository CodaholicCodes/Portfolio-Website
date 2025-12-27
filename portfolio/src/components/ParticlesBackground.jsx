import { useEffect, useRef } from "react"

export default function ParticlesBackground() {
const canvasref=useRef(null);
useEffect(()=>{
  const canvas=canvasref.current;
  const ctx=canvas.getContext('2d');
  let particlesArray=[];
  const particlesCount=50;
  const colors=["rgba(255,255,255,0.7)"];

  class Particle{
    constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.radius=Math.random()*2+1;
    this.colors=colors[Math.floor(Math.random()*colors.length)];
    this.speedX=(Math.random()-0.5)*0.5;
    this.speedY=(Math.random()-0.5)*0.5;
    }



    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
      ctx.shadowBlur=20;
      ctx.shadowColor=this.colors;
      ctx.fillStyle=this.colors;
      ctx.fill();
    }
    update(){
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;

      // wrap horizontally
      if(this.x < 0){
        this.x = canvas.width;
      }
      if(this.x > canvas.width){
        this.x = 0;
      }

      // wrap vertically so particles don't drift off-screen
      if(this.y < 0){
        this.y = canvas.height;
      }
      if(this.y > canvas.height){
        this.y = 0;
      }

      this.draw();
    }
  }

    function createParticles(params) {
         particlesArray=[];
      for(let i=0;i<particlesCount;i++){
        particlesArray.push(new Particle());
      }
    }

    function handleResize(){
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
      createParticles();
    }
    handleResize();
    window.addEventListener('resize',handleResize);
    let animationId;
    function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(particle=>{
      particle.update();
    } );
    animationId=requestAnimationFrame(animate);
}
animate();
  return ()=>{
    window.removeEventListener('resize',handleResize);
    cancelAnimationFrame(animationId);
  }

  },[]);

  return (
  <canvas 
  ref={canvasref}
  className="w-full h-full absolute pointer-events-none top-0 left-0 z-0">

  </canvas>
)
}