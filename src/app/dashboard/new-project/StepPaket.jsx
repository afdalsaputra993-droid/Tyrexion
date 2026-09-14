'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';
import LoadingSlot from './LoadingSlot';

export default function StepPaket({ onNext }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data } = await createClient()
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      setPackages(data || []);
      setLoading(false);
    };

    fetchPackages();
  }, []);

  // Animasi
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } }};
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

  if (loading) return <LoadingSlot teks="Memuat paket..." />;

  return (
    <motion.div 
      className="container py-5"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-2 rounded-pill mb-3">
          <i className="bi bi-stars me-1"></i> PILIHAN PAKET
        </span>
        <h2 className="fw-bold display-5 text-primary">Pilih Paket Website</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
          Sesuaikan dengan kebutuhan dan anggaran Anda.
        </p>
      </div>

      {/* Packages */}
      <div className="row g-4 justify-content-center">
        {packages.map((pkg) => (
          <motion.div 
            key={pkg.id} 
            className="col-12 col-md-6 col-lg-4"
            variants={item}
          >
            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNext(pkg)}
              className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
              style={{ cursor: 'pointer' }}
            >
              {/* Header Card */}
              <div className="card-header bg-gradient text-white text-center border-0 py-4"
                style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)' }}
              >
                <h4 className="fw-bold mb-0 fs-4">{pkg.name}</h4>
              </div>

              <div className="card-body d-flex flex-column p-4 p-md-5">
                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-muted small text-uppercase fw-bold ls-1">Investasi</span>
                  <div className="my-3">
                    <h2 className="fw-bold text-primary mb-0 display-6 text-break">
                      Rp {Number(pkg.price).toLocaleString('id-ID')}
                    </h2>
                  </div>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    <i className="bi bi-layers-fill me-1 text-primary"></i>
                    {pkg.max_section === null
                      ? 'Unlimited Section'
                      : `Maks. ${pkg.max_section} Section`}
                  </span>
                </div>

                {/* Features */}
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {pkg.features?.map((feature, index) => (
                    <li key={index} className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check-circle-fill text-success me-2 fs-5 flex-shrink-0"></i>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext(pkg);
                  }}
                  className="btn btn-primary w-100 rounded-pill py-3 fw-bold fs-6 mt-auto shadow-sm"
                >
                  <i className="bi bi-cart-check me-2"></i>
                  Pilih Paket Ini
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}