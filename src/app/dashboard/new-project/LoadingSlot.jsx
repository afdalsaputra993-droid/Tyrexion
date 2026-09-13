'use client';
import { motion } from 'framer-motion';

export default function LoadingSlot({teks}) {
  return (
    <motion.div 
      className="d-flex flex-column align-items-center justify-content-center py-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bootstrap Spinner dengan ukuran besar */}
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Memuat...</span>
      </div>
      
      {/* Teks Loading */}
      <p className="text-muted fw-medium fs-5 mb-0">
        {teks}
      </p>
      
      {/* Sub-teks opsional agar terlihat lebih profesional */}
      <small className="text-secondary mt-2">Mohon tunggu sebentar</small>
    </motion.div>
  );
}
