import {AnimatePresence} from 'framer-motion'
import { FiX } from "react-icons/fi";
import { motion } from 'framer-motion';

export default function Overlay({isOpen,onClose}){

const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
const origin = isMobile ? '95% 8%' : '50% 50%';
return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className='fixed inset-0 z-50 flex flex-col items-center justify-center text-white'
        initial={{ clipPath: `circle(0% at ${origin})` }}
        animate={{ clipPath: `circle(150% at ${origin})` }}
        exit={{ clipPath: `circle(0% at ${origin})` }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      >
    <button onClick={onClose} className='absolute top-6 right-6 text-white text-3xl'>
     <FiX />
    </button>

    <ul className='space-y-6 text-2xl font-medium text-center'>
    {
      ['Home','About','Skills','Projects','Experience','Contact' , 'Testimonials'].map((item,idx)=>(
       <motion.li key={idx}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.3 + idx * 0.1 }}
       >
       <a href={`#${item.toLowerCase()}`}
       onClick={onClose} 
       className='text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300'
       >
        {item}
       </a>
       </motion.li>
      ))
    }
    
    </ul>
    </motion.div>
  )}
  </AnimatePresence>
)
}