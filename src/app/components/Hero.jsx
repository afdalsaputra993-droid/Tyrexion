"use client" // wajib karena pake hook
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buatLinkWA } from "@/utils/messageWhatsApp";

export default function Hero() {
  return (
    <div className="container">
      
      {/* Gambar Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // mulai transparan + turun 20px
        animate={{ opacity: 1, y: 0 }}  // jadi normal
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image 
          src="/images/webHero.png"
          alt="GambarUtamaWeb"
          width={1472}  
          height={1136}  
          sizes="100vw" 
          style={{
            width: '100%',    
            height: 'auto'    
          }}
          className="object-fit-cover d-md-none"
          priority
        />
      </motion.div>
      
      <div className="row g-3 align-items-center">

        {/* Kolom Teks */}
        <motion.div 
          className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="mt-4">
            <h1 className="fs-1 fw-bold text-secondary text-center text-md-start">
              Bisnis Anda Belum Punya Website? Saatnya Mulai Sekarang!
            </h1>
            <h2 className="mt-3 fs-4 text-dark text-center text-md-start">
              Tyrexion — Wujudkan Website Impian Anda dalam Hitungan Hari
            </h2>
            <p className="text-center text-md-start text-muted">
              Nggak perlu ribet, nggak perlu mahal. Kami bantu bisnis Anda tampil profesional di dunia digital, cepat dan sesuai budget. Yuk, mulai langkah pertama hari ini!
            </p>
          </div>

          <div className="d-flex justify-content-center justify-content-md-start w-100 p-3">
            <motion.div
              whileHover={{ scale: 1.05 }} // pas hover gede dikit
              whileTap={{ scale: 0.95 }} // pas klik kecil dikit
            >
              <Link 
                href={buatLinkWA("konsultasi")}
                target="_blank" 
                className="btn btn-accent-cta rounded-pill btn-md fw-bold d-flex align-items-center gap-1"
              >
                <span className="bi bi-whatsapp fs-3"></span>
                Konsultasi Gratis Sekarang
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Kolom Gambar Desktop */}
        <motion.div 
          className="col-12 d-none d-md-flex col-md-6 align-items-center"
          initial={{ opacity: 0, x: 50 }} // mulai dari kanan
          animate={{ opacity: 1, x: 0 }}  // geser ke tempatnya
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image 
            src="/images/webHero.png"
            alt="GambarUtamaWeb"
            width={1138}  
            height={878}  
            sizes="100vw" 
            style={{
              width: '100%',    
              height: 'auto'    
            }}
            className="object-fit-cover"
            priority
          />
        </motion.div>

      </div>
    </div>
  )
}