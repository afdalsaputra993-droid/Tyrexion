"use client"; // wajib karena pake framer
import Image from "next/image";
import { motion } from "framer-motion";

// varian biar ga nulis ulang
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // delay antar anak 0.2s
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Intro() {
  return (
    <div className="container py-5">
        
        {/* 1. Container utama */}
        <motion.div 
          className="d-flex flex-column align-items-center gap-4 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          
          {/* 2. Wrapper Gambar */}
          <motion.div 
            className="position-relative" 
            style={{ width: "250px", aspectRatio: "1/1" }}
            variants={imageAnim}
          >
            <Image 
              src="/images/profile.png"
              alt="profile"
              fill
              sizes="250px"
              className="rounded-circle object-fit-cover shadow"
              priority
            />
          </motion.div>

          {/* 3. Judul */}
          <motion.div className="mt-3" variants={item}>
            <h1 className="fw-bold text-secondary display-5">Kenalan Sama Tyrexion</h1>
          </motion.div>

         <motion.div className="row g-5" variants={item}>
           <motion.div className="col-12 col-md-6" variants={item}>
             <p className="text-center">
             Kami percaya, setiap bisnis — sekecil apapun — berhak punya wajah digital yang meyakinkan.
             </p>
           </motion.div>
           <motion.div className="col-12 col-md-6" variants={item}>
             <p className="text-center">
             Tyrexion hadir untuk mewujudkan itu, satu website, satu langkah nyata.
             </p>
           </motion.div>
         </motion.div>
          
        </motion.div>

       </div>
  )
}