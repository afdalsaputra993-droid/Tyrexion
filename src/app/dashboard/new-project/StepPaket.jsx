'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';

// Jika Anda sudah membuat komponen LoadingSlot, import di sini:
import LoadingSlot from './LoadingSlot'; 

export default function StepPaket({ onNext }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPackages() {
      const { data } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });
      setPackages(data || []);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  // Animasi Variants
  const containerVars = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

  if (loading) <LoadingSlot teks="memuat paket..." />;

  return (
    <motion.div 
      className="container py-4"
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6 text-primary">Pilih Paket Website</h2>
        <p className="text-muted lead">Sesuaikan dengan kebutuhan dan anggaran Anda.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {packages.map((pkg) => (
          <div key={pkg.id} className="col-md-6 col-lg-4">
            <motion.div
              variants={itemVars}
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNext(pkg)}
              className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              {/* Header Kartu */}
              <div className="card-header bg-transparent border-0 pt-4 pb-0 text-center">
                <h4 className="fw-bold text-dark">{pkg.name}</h4>
              </div>

              <div className="card-body d-flex flex-column">
                {/* Harga */}
                <div className="text-center mb-4">
                  <span className="text-muted small">Mulai dari</span>
                  <h2 className="fw-bold text-primary my-1">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </h2>
                  <span className="badge bg-light text-dark border">
                    Maks {pkg.max_section === null ? 'Unlimited' : `${pkg.max_section} Section`}
                  </span>
                </div>

                {/* Fitur */}
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {pkg.features?.map((f, i) => (
                    <li key={i} className="mb-2 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                      <span className="text-secondary small">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Pilih (Visual Only) */}
                <button className="btn btn-outline-primary w-100 rounded-pill mt-auto">
                  Pilih Paket Ini
                </button>
              </div>
              
              {/* Efek Hover Border Accent */}
              <div className="position-absolute top-0 start-0 w-100 h-100 border border-primary rounded-3" 
                   style={{ opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} 
                   onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                   onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
