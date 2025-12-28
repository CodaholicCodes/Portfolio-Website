import { useState, useEffect } from "react";
import ParticlesBackground from "../components/ParticlesBackground.jsx"
import emailjs from "@emailjs/browser";
import {motion} from "framer-motion";
import Astra from "../assets/Astra.png"

const VITE_SERVICE_ID=import.meta.env.VITE_SERVICE_ID;
const VITE_TEMPLATE_ID=import.meta.env.VITE_TEMPLATE_ID;
const VITE_EMAIL_KEY=import.meta.env.VITE_EMAIL_KEY;
export default function Contact(){
const [formData,setFormData]=useState({
  name : "",
  email : "",
  service : "",
  budget : "",
  idea : ""
});
const [errors,setErrors]=useState({});
const [status,setStatus]=useState("");
useEffect(()=>{
  if(VITE_EMAIL_KEY){
    emailjs.init(VITE_EMAIL_KEY);
  }
},[]);
const handleChange=(e)=>{
  const {name,value}=e.target;
  if(name=="budget" && value && !/^\d+$/.test(value)) return;
  setFormData((p)=> ({...p,[name] : value}));
  if(errors[name]) setErrors((p)=>({...p,[name] : ""}));
}

const validateForm=()=>{
  const required=["name","email","service","idea"];
  const newErrors={};
  required.forEach((f)=>!formData[f].trim() && (newErrors[f]="Fill this field"));
  if(formData.service!=="other" && !formData.budget.trim())
    newErrors.budget="Fill this field";
  setErrors(newErrors);
  return !Object.keys(newErrors).length;
}
const handleSubmit=async (e)=>{
 e.preventDefault();
 if(!validateForm()) return;
 if(!VITE_SERVICE_ID || !VITE_TEMPLATE_ID || !VITE_EMAIL_KEY){
    setErrors((p)=>({...p, publicKey:"Missing EmailJS public key or IDs. Please set env variables."}));
    setStatus("error");
    return;
  }
  setStatus("sending");
  try {
  await emailjs.send(
    VITE_SERVICE_ID,
    VITE_TEMPLATE_ID,
    {
      ...formData,
      from_name : formData.name,
      reply_to:formData.email,
    },
    VITE_EMAIL_KEY
  );

  setStatus("success");
  setFormData({
  name : "",
  email : "",
  service : "",
  budget : "",
  idea : ""
  })
 } catch (error) {
  console.error(error);
 setStatus("error");
 }
}

  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      <ParticlesBackground />
    <div className="relative z-10 w-full flex flex-col items-center gap-10 md:flex-row">
      <motion.div className="w-full md:w-1/2 flex justify-center"
       initial={{opacity : 0 , x:-50}}
       whileInView={{opacity : 1, x:0}}
      transition={{duration : 0.6}}
      >
       <motion.img src={Astra} alt="Astronaut" 
       className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
       animate={{y:[0,-10,0]}}
       transition={{duration : 2 , repeat : Infinity , ease : "easeInOut"}}
       />
      </motion.div>

     <motion.div
     className="w-full md:w-1/2 bg-black/5 border border-white/10 p-8 rounded-2xl shadow-lg"
     initial={{opacity : 0 , x:50}}
     whileInView={{opacity : 1, x: 0}}
     transition={{duration : 0.6 }}
     >
      <h2 className="text-white font-bold text-3xl mb-6">
        Let's Work Together
      </h2>
      {errors.publicKey && <p className="text-red-500 text-sm mb-2">{errors.publicKey}</p>}
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5 ">
       <div className="flex flex-col">
        <label className="mb-1">Your Name <span className="text-red-500">*</span></label>
        <input type="text" placeholder="Enter Your Name" className={`bg-white/10 p-3 rounded-md border ${errors.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} 
        name="name" 
        value={formData.name} 
        onChange={handleChange}/>
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
       </div>
         <div className="flex flex-col">
        <label className="mb-1">Your Email <span className="text-red-500">*</span></label>
        <input type="email" placeholder="abc@gmail.com" className={`bg-white/10 p-3 rounded-md border ${errors.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} name="email" value={formData.email} onChange={handleChange}/>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
       </div>
       
          <div className="flex flex-col">
        <label className="mb-1">Service Needed <span className="text-red-500">*</span></label>
         <select name="service" id="" value={formData.service} onChange={handleChange} className={`bg-white/10 p-3 rounded-md border ${errors.service ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}>
         <option value="" disabled className="text-gray-400">Something in mind?</option>
          <option value="Web Developer" className="text-black">Web Development</option>
          <option value="Full Stack Developer" className="text-black">Full Stack Development</option>
          <option value="Software Developer" className="text-black">Software Development</option>
          <option value="other" className="text-black">Others</option>
         </select>
        {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
        {formData.service && formData.service!=="other" && (
          <div className="flex flex-col mt-1">
        <label className="mb-1">Budget<span className="text-red-500">*</span></label>
        <input type="number" placeholder="Enter your budget" className={`bg-white/10 p-3 rounded-md border ${errors.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} name="budget" value={formData.budget} onChange={handleChange}/>
        {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
       </div>

        )}

       </div>
          <div className="flex flex-col">
        <label className="mb-1">Explain your idea <span className="text-red-500">*</span></label>
        <textarea rows={4} placeholder="Enter your idea" className={`bg-white/10 p-3 rounded-md border ${errors.idea ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} name="idea" value={formData.idea} onChange={handleChange}/>
        {errors.idea && <p className="text-red-500 text-xs">{errors.idea}</p>}
       </div>

        {status && (
          <p className={`mb-1 text-sm ${status==="success" ? "text-green-400" : status==="error" ? "text-red-500" : "text-blue-600"}`}>
            {status==='sending' ? "sending..." : status==='success' ? "Message sent successfully ✅" : "Something went wrong❌"}
          </p>
        )}
      <motion.button className="bg-blue-600 text-white disabled:opacity-60 py-3 rounded-md font-semibold transition hover:bg-blue-700" 
      whileHover={{scale : 1.05}}
      whileTap={{scale : 0.95}}
      disabled={status==="sending"}
      type="submit"
      >
      {status==="sending" ? "sending..." : "Send Message"}

      </motion.button>
      </form>
     </motion.div>


    </div>

    </section>
  )
}