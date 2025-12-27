import Overlay from '../sections/Overlay'
import { useEffect, useRef, useState } from 'react'
import Logo from '../assets/Logo.png'
import { FiMenu } from "react-icons/fi";
export default function NavBar(){
 const [menuOpen,setMenuOpen]=useState(false);
 const [visible,setVisible]=useState(true);
const [forceVisible,setForceVisible]=useState(false);
const lastScrollY=useRef(0);
const timerId=useRef(null);


useEffect(()=>{
const homeSection=document.querySelector('#home');  
const observer=new IntersectionObserver((entry)=>{
  if(entry[0].isIntersecting){
  setForceVisible(true);
  setVisible(true);
  }
  else{
    setForceVisible(false);

  }
}, {threshold:0.1});
if(homeSection) observer.observe(homeSection);
return ()=>{
  if(homeSection) observer.unobserve(homeSection);
}
},[]);

useEffect(()=>{
  const handleScroll=()=>{
    if(forceVisible){
    setVisible(true);
    return;
    }
    const currentScrollY=window.scrollY;
    if(currentScrollY > lastScrollY.current){
      setVisible(false);
      if(timerId.current){
      clearTimeout(timerId.current);
      }
      timerId.current=setTimeout(()=>{
        setVisible(true);
      },3000);
    }
    lastScrollY.current=currentScrollY;

  }
  window.addEventListener('scroll',handleScroll,{passive:true});
  return ()=>{
    window.removeEventListener('scroll',handleScroll);
    if(timerId.current){
      clearTimeout(timerId.current);
    }
  };
},[forceVisible])


  return(
    <>
    <nav className={`fixed w-full top-0 left-0 flex items-center justify-between px-6 py-2 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full' }`}>
      <div className='flex items-center space-x-2'>
        <img src={Logo} alt="logo" className='w-8 h-8' />
<div className='text-2xl font-bold text-white hidden sm:block'>
  Codaholic
</div>
      </div>

      <div className='ml-auto lg:ml-0 block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:inset-y-0 flex items-center'>
    <button onClick={()=>setMenuOpen(true)}
      className='text-white text-3xl focus:outline-none'
     >
 <FiMenu />
    </button>
     </div>

    <div className='block'>
      <a href="#contact"
      className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 
      transition-opacity duration-300
      '
      >
       Reach Out 
      </a>

      </div>
     </nav>
    <Overlay isOpen={menuOpen} onClose={()=>setMenuOpen(false)}/>
    </>
  )
}