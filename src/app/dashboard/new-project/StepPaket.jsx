'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import LoadingSlot from './LoadingSlot';

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

export default function StepPaket({ onNext }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [domainOptions, setDomainOptions] = useState([]);
  const [loadingDomains, setLoadingDomains] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState('');
  const [renewal, setRenewal] = useState('');
  const [error, setError] = useState('');

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

  const handlePickPackage = async (pkg) => {
    setSelectedPkg(pkg);
    setSelectedDomainId('');
    setRenewal('');
    setError('');
    setLoadingDomains(true);

    const { data } = await supabase
      .from('package_domain_options')
      .select('*')
      .eq('package_slug', pkg.slug)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    setDomainOptions(data || []);
    setLoadingDomains(false);
  };

  const selectedDomain = domainOptions.find((d) => d.id === selectedDomainId);
  const needsRenewalChoice = selectedDomain && selectedDomain.extension !== null;
  const total = (selectedPkg?.price || 0) + (selectedDomain?.price || 0);

  const handleContinue = () => {
    setError('');
    if (!selectedDomainId) {
      setError('Pilih salah satu opsi domain dulu.');
      return;
    }
    if (needsRenewalChoice && !renewal) {
      setError('Pilih siapa yang mengurus perpanjangan tahun kedua.');
      return;
    }

    onNext(selectedPkg, {
      domainOptionId: selectedDomainId,
      domainRenewal: needsRenewalChoice ? renewal : null,
      domainLabel: selectedDomain?.label,
      domainPrice: selectedDomain?.price || 0,
    });
  };

  if (loading) return <LoadingSlot />;

  // Tahap 1: pilih paket
  if (!selectedPkg) {
    return (
      <div>
        <div className="text-center mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 className="fw-bold mb-2">Pilih Paket Website</h2>
          <p className="text-secondary">Sesuaikan dengan kebutuhan dan anggaran Anda.</p>
        </div>

        <div className="row g-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-4">
              <div
                onClick={() => handlePickPackage(pkg)}
                className="card h-100 border-0 shadow-sm"
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h5 className="fw-bold">{pkg.name}</h5>
                  <p className="fw-bold fs-5">{rupiah(pkg.price)}</p>
                  <ul className="list-unstyled small">
                    {pkg.features?.map((f, i) => (
                      <li key={i} className="mb-1">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary w-100 mt-2">Pilih Paket Ini</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tahap 2: pilih domain untuk paket yang dipilih
  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <button className="btn btn-link px-0 mb-2" onClick={() => setSelectedPkg(null)}>
        &larr; Ganti paket
      </button>

      <h2 className="fw-bold mb-1">Paket {selectedPkg.name}</h2>
      <p className="text-secondary mb-3">{rupiah(selectedPkg.price)}</p>

      <h6 className="fw-bold mb-2">Pilih Domain</h6>

      {loadingDomains ? (
        <p className="text-muted">Memuat pilihan domain...</p>
      ) : (
        domainOptions.map((opt) => (
          <div
            key={opt.id}
            className={`card mb-2 ${selectedDomainId === opt.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedDomainId(opt.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body py-2 d-flex justify-content-between align-items-center">
              <div className="form-check mb-0">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={selectedDomainId === opt.id}
                  onChange={() => setSelectedDomainId(opt.id)}
                />
                <label className="form-check-label">{opt.label}</label>
              </div>
              <span className="fw-semibold">{opt.price > 0 ? rupiah(opt.price) : 'Gratis'}</span>
            </div>
          </div>
        ))
      )}

      {needsRenewalChoice && (
        <div className="p-3 bg-light rounded-3 mt-3">
          <p className="fw-semibold mb-2">Perpanjangan domain tahun kedua, diurus oleh:</p>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="renewal"
              checked={renewal === 'user'}
              onChange={() => setRenewal('user')}
            />
            <label className="form-check-label">Saya sendiri</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="renewal"
              checked={renewal === 'tyrexion'}
              onChange={() => setRenewal('tyrexion')}
            />
            <label className="form-check-label">
              Tyrexion (biaya &amp; detail dibahas lewat WhatsApp)
            </label>
          </div>
        </div>
      )}

      {error && <p className="text-danger small mt-2">{error}</p>}

      <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded-3">
        <span className="fw-semibold">Total</span>
        <span className="fw-bold fs-5">{rupiah(total)}</span>
      </div>

      <button className="btn btn-primary w-100 mt-3" onClick={handleContinue}>
        Lanjut Isi Form
      </button>
    </div>
  );
}