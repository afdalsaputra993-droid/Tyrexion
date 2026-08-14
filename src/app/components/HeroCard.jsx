"use client" // wajib karena pake framer
import { motion } from "framer-motion";

const card = [
  {
    icon: "bi-wallet2",
    judul: "Harga Ramah di Kantong",
    desk: "Paket fleksibel yang dirancang khusus untuk UMKM, tanpa bikin kantong bolong"
  },
  {
    icon: "bi-arrow-repeat",
    judul: "Revisi Tanpa Drama",
    desk: "Belum puas? Tenang, revisi gratis sudah termasuk sampai anda benar puas dengan hasilnya"
  },
  {
    icon: "bi-lightning-charge",
    judul: "Proses Kilat, Hasil Maksimal",
    desk: "Website anda bisa jadi dalam hitungan hari, bukan bulan. Cepat action, cepat naik kelas"
  }
]

// 1. Varian untuk parent, buat ngatur delay antar card
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // jeda 0.2s antar card
    }
  }
}

// 2. Varian untuk tiap card
const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // mulai dari bawah 30px
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function HeroCard() {
  return (
    <div className="mt-5">
      <div className="container">
         <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show" // jalan pas masuk layar
          viewport={{ once: true, amount: 0.2 }} // cuma 1x, pas 20% section keliatan
         >
           {card.map((item, id) => (
            <motion.div 
              key={id} 
              className="col-12 mx-auto col-md-4"
              variants={itemVariants} // pake varian item
            >
              <div className="card h-100 border-0 shadow-sm shadow-lg-hover bg-gradient rounded-4 p-4 transition">
                <div className="d-flex flex-column gap-3">
                  
                  {/* Icon Badge */}
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-gradient text-white" style={{width: "56px", height: "56px"}}>
                    <i className={`bi ${item.icon} fs-3`}></i>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="fw-bold fs-5 mb-2 text-dark">
                      {item.judul}
                    </h3>
                    <p className="text-secondary mb-0 lh-lg">
                      {item.desk}
                    </p>
                  </div>

                </div>
              </div>
           </motion.div>
           ))}
         </motion.div>
      </div>
    </div>
  )
}