"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { buatLinkWA } from "@/utils/messageWhatsApp"

export default function CtaHome() {
  return (
    <motion.div 
      className="mt-5 py-5"
      initial={{ opacity: 0, y: 30 }} // mulai transparan + turun
      whileInView={{ opacity: 1, y: 0 }} // muncul ke atas
      viewport={{ once: true, amount: 0.3 }} // cuma 1x, pas 30% keliatan
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="d-flex justify-content-center align-items-center flex-column text-center">
          
          <h2 className="display-3 fw-bold text-secondary mb-4">
            Siap Bawa Bisnis Anda ke Dunia Digital?
          </h2>
          
          <p className="text-muted">
            Konsultasi gratis sekarang, dan mulai langkah pertama menuju bisnis yang lebih berkembang.
          </p>

          <div className="mt-3 d-flex justify-content-center align-items-center w-100 p-3">
            <motion.div
              whileHover={{ scale: 1.05 }} // gede dikit pas hover
              whileTap={{ scale: 0.95 }} // kecil pas di klik
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link 
                href={buatLinkWA("konsultasi")}
                target="_blank" 
                className="btn btn-accent-cta rounded-pill btn-lg fw-bold d-flex align-items-center gap-2 px-4"
              >
                <span className="bi bi-whatsapp fs-3"></span>
                Konsultasi Sekarang
              </Link>
            </motion.div>
        </div>
        </div>
      </div>
    </motion.div>
  )
}