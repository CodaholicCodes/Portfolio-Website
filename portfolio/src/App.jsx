
import './App.css'
import NavBar from './components/NavBar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCursor from './components/CustomCursor'
import { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
function App() {
  const [introDone,setIntroDone]=useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={()=>setIntroDone(true)} /> }
      {introDone && (
        <div className='relative gradient text-white' >
          <CustomCursor />
          <Home />
          <NavBar />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      )}
    </>
  )
}

export default App
