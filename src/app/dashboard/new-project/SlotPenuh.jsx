'use client'; // Wajib untuk Framer Motion
import { motion } from 'framer-motion';

export default function SlotPenuh() {
  return (
    <motion.div 
      className="container py-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg text-center p-5">
            
            <motion.div 
              className="mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="bg-warning bg-opacity-10 d-inline-flex p-4 rounded-circle">
                <i className="bi bi-hourglass-split text-secondary display-4"></i>
              </div>
            </motion.div>

            <motion.h2 
              className="fw-bold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Slot Sedang Penuh
            </motion.h2>
            
            <motion.p 
              className="text-muted lead mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Maaf, semua slot saat ini sedang terpakai. 
              Silakan tunggu beberapa saat atau coba lagi nanti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className="btn btn-outline-primary px-4 py-2 rounded-pill"
                onClick={() => window.location.reload()} 
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Coba Lagi
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
