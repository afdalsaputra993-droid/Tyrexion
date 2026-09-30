'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import LoadingSlot from './LoadingSlot';

export default function StepDesainWedding({ selectedPaket, onNext }) {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchDesigns() {
      const { data } = await supabase
        .from('wedding_designs')
        .select('*')
        .eq('is_active', true)
        .lte('level_minimum', selectedPaket.level)
        .order('sort_order', { ascending: true });
      setDesigns(data || []);
      setLoading(false);
    }
    fetchDesigns();
  }, [selectedPaket]);

  if (loading) return <LoadingSlot />;

  if (designs.length === 0) {
    return (
      <div className="text-center p-4">
        <h5 className="fw-bold">Belum Ada Desain Tersedia</h5>
        <p className="text-secondary">
          Untuk paket {selectedPaket.name}, desain belum tersedia saat ini.
          Silakan hubungi admin via WhatsApp untuk informasi lebih lanjut.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-3">Pilih Desain — Paket {selectedPaket.name}</h2>

      <div className="row g-3">
        {designs.map((d) => (
          <div key={d.id} className="col-12 col-md-6">
            <div
              className="card h-100 border-0 shadow-sm"
              onClick={() => onNext(d)}
              style={{ cursor: 'pointer' }}
            >
              {d.preview_image_url && (
                <img src={d.preview_image_url} className="card-img-top" alt={d.name} />
              )}
              <div className="card-body">
                <h5 className="fw-bold">{d.name}</h5>
                <p className="text-secondary small mb-2">
                  {d.sections?.length || 0} section
                </p>
                {d.demo_url && (
                  <a
                    href={d.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Lihat Demo
                  </a>
                )}
                <button className="btn btn-primary w-100 mt-2">Pilih Desain Ini</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}