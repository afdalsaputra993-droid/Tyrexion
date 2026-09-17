'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function StepFormLandingPage({ selectedPaket, onSubmit, submitting }) {
  // ... logic kamu tetap sama 100% gak aku ubah ...
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
  const maxSection = selectedPaket.max_section;

  useEffect(() => {
    async function fetchData() {
      const { data: secs } = await supabase.from('section_options').select('*').eq('category', 'landing_page').eq('is_active', true).order('sort_order');
      const { data: cats } = await supabase.from('kategori_bisnis').select('*').eq('is_active', true);
      setSectionOptions(secs || []);
      setListKategoriBisnis(cats || []);
    }
    fetchData();
  }, []);

  const toggleSection = (label) => {
    setSections((prev) => {
      if (prev.includes(label)) return prev.filter((s) => s !== label);
      if (maxSection !== null && prev.length >= maxSection) return prev;
      return [...prev, label];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!namaBisnis || !kategoriBisnis || !targetKonsumen || !deskripsi || sections.length === 0 || !whatsapp) {
      setError('Mohon lengkapi semua field wajib (*).');
      return;
    }
    onSubmit({
      package_slug: selectedPaket.slug,
      form_data: { nama_bisnis: namaBisnis, kategori_bisnis: kategoriBisnis, target_konsumen: targetKonsumen, warna, sections, deskripsi, referensi, catatan, whatsapp },
    });
  };

  const inputClass = "form-control bg-light border-0 shadow-sm";
  const labelClass = "form-label fw-bold text-secondary small mb-1";

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      // FIX 1: container-fluid + maxWidth 1280px. Jadi di HP tetep full, di desktop 2K gak molor
      className="container-fluid px-3 px-lg-4 py-4"
      style={{ maxWidth: '1280px' }}
    >
      <div className="row justify-content-center">
        {/* FIX 2: col-12 aja, jangan dikecilin. Lebarnya udah diatur sama maxWidth di atas */}
        <div className="col-12">
          
          <div className="text-center mb-4">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-2">
              Paket: {selectedPaket.name}
            </span>
            <h2 className="fw-bold h3">Detail Project Landing Page</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-3 p-md-4 p-lg-5 rounded-4 shadow-sm border">
            
            {/* 1. Identitas */}
            <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Identitas Bisnis</h6>
            <div className="row g-3 g-lg-4 mb-4"> {/* FIX 3: g-lg-4 biar di desktop gak dempet */}
              <div className="col-md-6">
                <label className={labelClass}>Nama Bisnis *</label>
                <input className={`${inputClass} p-3`} placeholder="Contoh: Kopi Senja" value={namaBisnis} onChange={(e) => setNamaBisnis(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className={labelClass}>Kategori Bisnis *</label>
                <select className={`${inputClass} form-select p-3`} value={kategoriBisnis} onChange={(e) => setKategoriBisnis(e.target.value)}>
                  <option value="">Pilih kategori...</option>
                  {listKategoriBisnis.map((b) => <option key={b.id} value={b.nama_bisnis}>{b.nama_bisnis}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className={labelClass}>Target Konsumen *</label>
                <textarea className={`${inputClass} p-3`} rows="2" placeholder="Usia, minat, lokasi, dll." value={targetKonsumen} onChange={(e) => setTargetKonsumen(e.target.value)} />
              </div>
            </div>

            {/* 2. Desain & Section */}
            <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Desain & Struktur</h6>
            
            <div className="mb-4 p-3 p-lg-4 bg-light rounded-3">
              <label className={`${labelClass} d-block mb-2`}>
                Pilih Section <span className="text-muted fw-normal">({sections.length}{maxSection ? `/${maxSection}` : ''})</span>
              </label>
              <div className="d-flex flex-wrap gap-2">
                {sectionOptions.map((opt) => {
                  const isSelected = sections.includes(opt.label);
                  const isFull = maxSection !== null && sections.length >= maxSection;
                  const disabled = !isSelected && isFull;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => !disabled && toggleSection(opt.label)}
                      disabled={disabled}
                      className={`btn btn-sm rounded-pill px-3 py-2 border ${isSelected ? 'btn-primary border-primary' : 'btn-white bg-white text-secondary border-light shadow-sm'} ${disabled ? 'opacity-50' : ''}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="row g-3 g-lg-4 mb-4">
              <div className="col-md-6">
                <label className={labelClass}>Warna Utama (Opsional)</label>
                <input className={`${inputClass} p-3`} placeholder="Misal: Biru Navy" value={warna} onChange={(e) => setWarna(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className={labelClass}>Link Referensi (Opsional)</label>
                <input className={`${inputClass} p-3`} placeholder="https://..." value={referensi} onChange={(e) => setReferensi(e.target.value)} />
              </div>
              <div className="col-12">
                <label className={labelClass}>Deskripsi Detail *</label>
                <textarea className={`${inputClass} p-3`} rows="3" placeholder="Jelaskan fitur unik atau gaya yang diinginkan." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
              </div>
            </div>

            {/* 3. Kontak */}
            <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Kontak & Kirim</h6>
            <div className="row g-3 g-lg-4 mb-4">
              <div className="col-md-6">
                <label className={labelClass}>WhatsApp *</label>
                <div className="input-group shadow-sm rounded-3 overflow-hidden">
                  <span className="input-group-text bg-light border-0 text-success"><i className="bi bi-whatsapp fs-5"></i></span>
                  <input className={`${inputClass} border-0`} placeholder="0812..." value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <label className={labelClass}>Catatan Tambahan</label>
                <textarea className={`${inputClass} p-3`} rows="1" placeholder="Pesan untuk developer..." value={catatan} onChange={(e) => setCatatan(e.target.value)} />
              </div>
            </div>

            {error && <div className="alert alert-danger py-2 small mb-3"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}

            <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm fs-5" disabled={submitting}>
              {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Mengirim...</> : 'Kirim Pengajuan'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}