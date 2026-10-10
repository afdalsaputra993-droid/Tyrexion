'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import LoadingSlot from './LoadingSlot';

export default function StepDesainWedding({ selectedPaket, onNext }) {
  const [designs, setDesigns] = useState([]);
  const [colorsByDesign, setColorsByDesign] = useState({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchDesigns() {
      const { data: designData } = await supabase
        .from('wedding_designs')
        .select('*')
        .eq('is_active', true)
        .lte('level_minimum', selectedPaket.level)
        .order('sort_order', { ascending: true });

      setDesigns(designData || []);

      if (designData && designData.length > 0) {
        const designIds = designData.map((d) => d.id);
        const { data: colorData } = await supabase
          .from('wedding_design_colors')
          .select('*')
          .in('design_id', designIds)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        const grouped = {};
        (colorData || []).forEach((c) => {
          if (!grouped[c.design_id]) grouped[c.design_id] = [];
          grouped[c.design_id].push(c);
        });
        setColorsByDesign(grouped);
      }

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
        {designs.map((d) => {
          const warnaList = colorsByDesign[d.id] || [];
          return (
            <div key={d.id} className="col-12 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                {warnaList[0]?.preview_image_url && (
                  <img
                    src={warnaList[0].preview_image_url}
                    className="card-img-top"
                    alt={d.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="fw-bold">{d.name}</h5>
                  <p className="text-secondary small mb-2">
                    {d.sections?.length || 0} section
                  </p>

                  {warnaList.length > 0 && (
                    <div className="mb-2">
                      <p className="small fw-semibold mb-1">Lihat Demo:</p>
                      <div className="d-flex gap-2 flex-wrap">
                        {warnaList.map((w) => (
                          <a
                            key={w.id}
                            href={w.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-secondary btn-sm"
                          >
                            {w.color_name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => onNext(d)}
                  >
                    Pilih Desain Ini
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}