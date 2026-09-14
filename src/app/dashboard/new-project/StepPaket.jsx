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

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  if (loading) return <LoadingSlot />;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 className="fw-bold mb-2">Pilih Paket Website</h2>
        <p className="text-secondary">Sesuaikan dengan kebutuhan dan anggaran Anda.</p>
      </div>

      {/* Grid Paket */}
      <motion.div
        className="row g-3"
        variants={containerVars}
        initial="hidden"
        animate="visible"
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.id} className="col-12 col-md-4" variants={itemVars}>
            <div
              onClick={() => onNext(pkg)}
              className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              {/* Header Kartu */}
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="fw-bold mb-0">{pkg.name}</h5>
              </div>

              <div className="card-body px-4 pb-4 d-flex flex-column">
                {/* Harga */}
                <div className="mb-3">
                  <p className="text-uppercase small text-muted mb-1" style={{ letterSpacing: '0.5px' }}>
                    Investasi
                  </p>
                  <div className="d-flex flex-wrap align-items-baseline">
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: '1.5rem',
                        wordBreak: 'break-word',
                        lineHeight: 1.2,
                      }}
                    >
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-secondary small mt-2 mb-0">
                    <i className="bi bi-layers me-1"></i>
                    Maks {pkg.max_section === null ? 'Unlimited' : `${pkg.max_section} Section`}
                  </p>
                </div>

                {/* Fitur List */}
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {pkg.features?.map((f, i) => (
                    <li key={i} className="d-flex align-items-start mb-2 small">
                      <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Pilih */}
                <button className="btn btn-primary w-100 mt-auto">
                  Pilih Paket Ini
                </button>
              </div>

              {/* Efek Hover Border Accent */}
              <div
                className="position-absolute top-0 start-0 w-100"
                style={{
                  height: '4px',
                  backgroundColor: 'var(--bs-primary)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}