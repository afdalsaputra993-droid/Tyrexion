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

  if (loading) return <LoadingSlot />;

  // Variant untuk container (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Variant untuk item card
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 border border-primary border-opacity-25">
          <i className="bi bi-grid-3x3-gap-fill me-2"></i>
          PILIHAN PAKET
        </span>

        <h2 className="fw-bold display-6 mb-3 text-dark">
          Pilih Paket Website Ideal Anda
        </h2>

        <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: '600px' }}>
          Solusi digital yang disesuaikan dengan kebutuhan bisnis dan anggaran Anda. Transparan, tanpa biaya tersembunyi.
        </p>
      </motion.div>

      {/* Packages Grid */}
      {packages.length > 0 ? (
        <motion.div
          className="row g-4 justify-content-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="col-12 col-md-6 col-lg-4"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative cursor-pointer group"
                role="button"
                onClick={() => onNext(pkg)}
                style={{ 
                  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                }}
              >
                {/* Decorative Top Border */}
                <div className="position-absolute top-0 start-0 w-100 h-1 bg-primary opacity-75"></div>

                <div className="card-body p-4 d-flex flex-column">
                  
                  {/* Header Card */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-dark mb-0 fs-4">
                      {pkg.name}
                    </h5>
                    {/* Optional: Highlight Badge for middle/expensive packages could go here */}
                  </div>

                  {/* Price Section */}
                  <div className="mb-4 p-3 bg-white rounded-3 border border-light shadow-sm">
                    <small className="text-uppercase text-muted fw-semibold ls-1" style={{ fontSize: '0.75rem' }}>
                      Total Investasi
                    </small>
                    <div className="d-flex align-items-baseline mt-1">
                      <span className="fs-5 fw-bold text-primary me-1">Rp</span>
                      <span className="display-6 fw-bold text-dark lh-1">
                        {Number(pkg.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="mt-2 d-flex align-items-center text-secondary small">
                      <i className="bi bi-layers-half me-2 text-primary"></i>
                      <span className="fw-medium">
                        {pkg.max_section === null
                          ? 'Unlimited Section'
                          : `Maks. ${pkg.max_section} Section`}
                      </span>
                    </div>
                  </div>

                  <hr className="text-muted opacity-25 my-3" />

                  {/* Features List */}
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {pkg.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-start gap-3 mb-3 text-secondary small"
                      >
                        <div className="bg-success bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                          <i className="bi bi-check-lg text-success fs-6" style={{ lineHeight: 1 }}></i>
                        </div>
                        <span className="lh-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    type="button"
                    className="btn btn-primary w-100 py-3 rounded-3 fw-semibold shadow-sm hover-shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext(pkg);
                    }}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <span>Pilih Paket Ini</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-inbox fs-1 text-muted"></i>
          <p className="text-muted mt-3">Tidak ada paket yang tersedia saat ini.</p>
        </div>
      )}
      
      {/* Custom CSS for hover effects via style tag or global css is recommended, 
          but inline styles are used here for simplicity as requested */}
      <style jsx>{`
        .cursor-pointer { cursor: pointer; }
        .group:hover { box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
        .hover-shadow:hover { box-shadow: 0 0.5rem 1rem rgba(13, 110, 253, 0.3) !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
