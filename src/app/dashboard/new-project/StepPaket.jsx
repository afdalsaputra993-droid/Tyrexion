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

  return (
    <div>
      {/* Header */}
      <div className="text-center mx-auto mb-4" style={{ maxWidth: 600 }}>
        <span className="badge text-bg-primary rounded-pill px-3 py-2 mb-3">
          PILIHAN PAKET
        </span>

        <h2 className="fw-bold mb-2">
          Pilih Paket Website
        </h2>

        <p className="text-secondary mb-0">
          Sesuaikan dengan kebutuhan dan anggaran Anda.
        </p>
      </div>

      {/* Packages */}
      <motion.div
        className="row g-4 justify-content-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            className="col-12 col-md-6 col-lg-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <div
              className="card h-100 border shadow-sm rounded-4 overflow-hidden"
              role="button"
              onClick={() => onNext(pkg)}
            >
              <div className="card-body p-4 d-flex flex-column">

                {/* Package */}
                <h5 className="fw-bold mb-3">
                  {pkg.name}
                </h5>

                {/* Price */}
                <div className="mb-4">
                  <small className="text-uppercase text-muted fw-semibold">
                    Investasi
                  </small>

                  <div className="fs-3 fw-bold mt-1">
                    Rp {Number(pkg.price).toLocaleString('id-ID')}
                  </div>

                  <small className="text-secondary">
                    <i className="bi bi-layers me-1" />
                    {pkg.max_section === null
                      ? 'Unlimited Section'
                      : `Maks. ${pkg.max_section} Section`}
                  </small>
                </div>

                <hr />

                {/* Features */}
                <ul className="list-unstyled mb-4 flex-grow-1">
                  {pkg.features?.map((feature, index) => (
                    <li
                      key={index}
                      className="d-flex gap-2 mb-2 small text-secondary"
                    >
                      <i className="bi bi-check-circle-fill text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext(pkg);
                  }}
                >
                  Pilih Paket Ini
                  <i className="bi bi-arrow-right ms-2" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}