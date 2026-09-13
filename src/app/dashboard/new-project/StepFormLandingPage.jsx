'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function StepFormLandingPage({ selectedPaket, onSubmit, submitting }) {
  const [sectionOptions, setSectionOptions] = useState([]);
  const [namaBisnis, setNamaBisnis] = useState('');
  const [listKategoriBisnis, setListKategoriBisnis] = useState([]);
  const [kategoriBisnis, setKategoriBisnis] = useState('');
  const [targetKonsumen, setTargetKonsumen] = useState('');
  const [warna, setWarna] = useState('');
  const [sections, setSections] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [referensi, setReferensi] = useState('');
  const [catatan, setCatatan] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');

  const supabase = createClient();
  const maxSection = selectedPaket.max_section; // null = tanpa batas

  useEffect(() => {
    async function fetchSections() {
      const { data } = await supabase
        .from('section_options')
        .select('*')
        .eq('category', 'landing_page')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      setSectionOptions(data || []);

      const { data: listBisnis } = await supabase.from('kategori_bisnis').select('*').eq('is_active', true);
      setListKategoriBisnis(listBisnis);
    }
    fetchSections();
  }, []);

  const toggleSection = (label) => {
    setSections((prev) => {
      if (prev.includes(label)) return prev.filter((s) => s !== label);
      if (maxSection !== null && prev.length >= maxSection) return prev;
      return [...prev, label];
    });
  };

  const hitungPoin = () => {
    const ekstra = Math.max(0, sections.length - 2);
    return selectedPaket.base_points + ekstra * 2;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setError('');

  if (!namaBisnis || !kategoriBisnis || !targetKonsumen || !deskripsi || sections.length === 0 || !whatsapp) {
    setError('Lengkapi semua field yang wajib diisi.');
    return;
  }

  onSubmit({
    package_slug: selectedPaket.slug,
    form_data: {
      nama_bisnis: namaBisnis,
      kategori_bisnis: kategoriBisnis,
      target_konsumen: targetKonsumen,
      warna,
      sections,
      deskripsi,
      referensi,
      catatan,
      whatsapp,
    },
  });
};

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="fw-bold mb-3">Detail Project — {selectedPaket.name}</h2>

      <div className="mb-3">
        <label className="form-label fw-semibold">Nama Bisnis</label>
        <input className="form-control" value={namaBisnis} onChange={(e) => setNamaBisnis(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Kategori Bisnis</label>
        <select className="form-select" value={kategoriBisnis} onChange={(e) => setKategoriBisnis(e.target.value)}>
          <option value="">Pilih kategori</option>
          {listKategoriBisnis.map((bisnis) => (
           <option key={bisnis.id} value={bisnis.nama_bisnis}>{bisnis.nama_bisnis}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Target Konsumen</label>
        <textarea className="form-control" rows="2" value={targetKonsumen} onChange={(e) => setTargetKonsumen(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Preferensi Warna (opsional)</label>
        <input className="form-control" value={warna} onChange={(e) => setWarna(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Section yang Diinginkan ({sections.length}/{maxSection === null ? '∞' : maxSection})
        </label>
        {sectionOptions.map((opt) => {
          const disabled = !sections.includes(opt.label) && maxSection !== null && sections.length >= maxSection;
          return (
            <div className="form-check" key={opt.id}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={sections.includes(opt.label)}
                disabled={disabled}
                onChange={() => toggleSection(opt.label)}
              />
              <label className="form-check-label">{opt.label}</label>
            </div>
          );
        })}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Deskripsi Website yang Diinginkan</label>
        <textarea className="form-control" rows="3" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Link Referensi Desain (opsional)</label>
        <input className="form-control" value={referensi} onChange={(e) => setReferensi(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Catatan Tambahan</label>
        <textarea className="form-control" rows="2" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
        <small className="text-muted">Fitur menyesuaikan paket yang dipilih.</small>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Nomor Telepon/WhatsApp</label>
        <input className="form-control" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
      </div>

      {error && <p className="text-danger">{error}</p>}

      <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
        {submitting ? 'Mengirim...' : 'Kirim Pengajuan'}
      </button>
    </form>
  );
}