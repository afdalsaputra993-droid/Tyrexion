'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          
          <motion.div 
            className="card border-0 shadow-lg p-5 rounded-4 bg-white"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Ikon Gear/Setting */}
            <div className="mb-4 text-secondary">
              <i className="bi bi-gear-wide-connected display-1"></i>
            </div>

            <h2 className="fw-bold mb-3">Halaman Pengaturan</h2>
            <p className="text-muted lead mb-4 mx-auto" style={{ maxWidth: '500px' }}>
              Maaf, halaman pengaturan akun sedang dalam masa perbaikan. 
              Kami akan segera mengembalikannya agar Anda dapat mengelola profil dengan nyaman.
            </p>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link href="/" className="btn btn-primary btn-lg rounded-pill px-4">
                <i className="bi bi-house-door me-2"></i>Kembali ke Beranda
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
