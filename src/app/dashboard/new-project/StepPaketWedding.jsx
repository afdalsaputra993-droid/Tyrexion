'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import LoadingSlot from './LoadingSlot';

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

export default function StepPaketWedding({ onNext }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPackages() {
      const { data } = await supabase
        .from('wedding_packages')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      setPackages(data || []);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  if (loading) return <LoadingSlot />;

  return (
    <div>
      <div className="text-center mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 className="fw-bold mb-2">Pilih Paket Wedding</h2>
        <p className="text-secondary">Makin tinggi paket, makin banyak pilihan desain.</p>
      </div>

      <div className="row g-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="col-12 col-md-4">
            <div
              onClick={() => onNext(pkg)}
              className="card h-100 border-0 shadow-sm"
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="fw-bold">{pkg.name}</h5>
                <p className="fw-bold fs-5">{rupiah(pkg.price)}</p>
                <button className="btn btn-primary w-100 mt-2">Pilih Paket Ini</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}