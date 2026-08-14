"use client"
import { motion } from "framer-motion";

const card = [
  {
    id: 1,
    judul: "Konsultasi",
    desk: "Hubungi kami via WhatsApp, ceritakan kebutuhan website Anda — kami bantu rancang solusi yang pas."
  },
  {
    id: 2,
    judul: "Briefing & Perencanaan",
    desk: "Deskripsi: Kami susun rencana detail sesuai kebutuhan bisnis Anda, lalu mulai proses dengan DP 50%."
  },
  {
    id: 3,
    judul: "Proses Pengerjaan",
    desk: "Website dikerjakan sesuai timeline, dengan update status secara berkala agar Anda selalu tahu progresnya."
  },
  {
    id: 4,
    judul: "Serah Terima",
    desk: "Website selesai, domain aktif di akun Anda sendiri, dan pelunasan dilakukan — website siap digunakan sepenuhnya."
  }
]

// 1. Varian untuk parent
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25 // jeda 0.25s antar nomor
    }
  }
}

// 2. Varian untuk tiap item - dari kiri
const itemVariants = {
  hidden: { opacity: 0, x: -40 }, // mulai dari kiri 40px
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function AlurKerja() {
  return (
    <section className="py-5">
      <div className="container">

        {/* Headline */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
         <h2 className="fw-bold text-secondary">Proses Kerja yang Simpel dan Transparan</h2>
        </motion.div>
        
        <motion.div 
          className="row g-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show" // jalan pas masuk layar
          viewport={{ once: true, amount: 0.2 }} // cuma 1x
        >
           {card.map((item) => (
            <motion.div 
              key={item.id} // pake item.id biar aman
              className="col-12"
              variants={itemVariants} // pake varian item
            >
              <div className="p-3 h-100">
                <div className="d-flex align-items-start gap-3">
                  
                  {/* Icon Badge */}
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 bg-primary bg-gradient text-white fw-bold" 
                       style={{width: "52px", height: "52px", fontSize: "1.5rem"}}>
                    {item.id}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="fw-bold fs-5 mb-2 text-dark">
                      {item.judul}
                    </h3>
                    <p className="text-secondary mb-0">
                      {item.desk}
                    </p>
                  </div>

                </div>
              </div>
           </motion.div>
           ))}
        </motion.div>
      </div>
    </section>
  )
}