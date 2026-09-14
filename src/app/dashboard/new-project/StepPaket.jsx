'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';
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

  if (loading) return <LoadingSlot teks="Memuat paket..." />;

  return (
    <motion.div 
      className="container py-4"
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      {/* Header dengan lebar terbatas agar rapi di desktop */}
      <div className="text-center mb-5 px-3">
        <h2 className="fw-bold display-6 text-primary">Pilih Paket Website</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
          Sesuaikan dengan kebutuhan dan anggaran Anda.
        </p>
      </div>

      {/* Grid System yang Lebih Responsif */}
      <div className="row g-4 justify-content-center">
        {packages.map((pkg) => (
          <div key={pkg.id} className="col-md-6 col-lg-5 col-xl-4">
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
                <h4 className="fw-bold text-dark mb-0">{pkg.name}</h4>
              </div>

              <div className="card-body d-flex flex-column p-4">
                {/* Harga Section */}
                <div className="text-center mb-4">
                  <span className="text-muted small text-uppercase fw-bold ls-1">Investasi</span>
                  <div className="my-2">
                    <h2 className="fw-bold text-primary mb-0 text-nowrap">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </h2>
                  </div>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    <i className="bi bi-layers me-1"></i>
                    Maks {pkg.max_section === null ? 'Unlimited' : `${pkg.max_section} Section`}
                  </span>
                </div>

                {/* Fitur List */}
                <ul className="list-unstyled mb-4 flex-grow-1 text-start">
                  {pkg.features?.map((f, i) => (
                    <li key={i} className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-success me-2 mt-1 flex-shrink-0"></i>
                      <span className="text-secondary small lh-base">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Pilih */}
                <button className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold mt-auto">
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
