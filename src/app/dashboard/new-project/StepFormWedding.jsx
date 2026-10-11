'use client';
import { useState } from 'react';

export default function StepFormWedding({ selectedPaket, selectedDesain, onSubmit, submitting }) {
  const sections = selectedDesain?.sections || [];
  const ada = (namaSection) => sections.includes(namaSection);

  const [namaPria, setNamaPria] = useState('');
  const [namaWanita, setNamaWanita] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [ortuPria, setOrtuPria] = useState('');
  const [ortuWanita, setOrtuWanita] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jamLokasiAkad, setJamLokasiAkad] = useState('');
  const [alamatAkad, setAlamatAkad] = useState('');
  const [jamLokasiResepsi, setJamLokasiResepsi] = useState('');
  const [alamatResepsi, setAlamatResepsi] = useState('');
  const [linkMaps, setLinkMaps] = useState('');
  const [ceritaSingkat, setCeritaSingkat] = useState('');
  const [rekening, setRekening] = useState('');
  const [catatan, setCatatan] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');

  const inputClass = "form-control bg-light border-0 shadow-sm";
  const labelClass = "form-label fw-bold text-secondary small mb-1";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!namaPria || !namaWanita || !namaPanggilan || !tanggal || !whatsapp) {
      setError('Lengkapi semua field yang wajib diisi (*).');
      return;
    }
    if (ada('Mempelai') && (!ortuPria || !ortuWanita)) {
      setError('Nama orang tua wajib diisi.');
      return;
    }
    if (ada('Detail Acara (Akad & Resepsi)') && (!jamLokasiAkad || !alamatAkad || !jamLokasiResepsi || !alamatResepsi)) {
      setError('Detail acara (Akad & Resepsi) wajib diisi lengkap.');
      return;
    }
    if (ada('Wedding Gift / Amplop Digital') && !rekening) {
      setError('Nomor rekening/QRIS wajib diisi.');
      return;
    }

    onSubmit({
      package_slug: selectedPaket.slug,
      design_id: selectedDesain.id,
      form_data: {
        nama_pria: namaPria,
        nama_wanita: namaWanita,
        nama_panggilan: namaPanggilan,
        ortu_pria: ortuPria,
        ortu_wanita: ortuWanita,
        tanggal_pernikahan: tanggal,
        jam_lokasi_akad: jamLokasiAkad,
        alamat_akad: alamatAkad,
        jam_lokasi_resepsi: jamLokasiResepsi,
        alamat_resepsi: alamatResepsi,
        link_maps: linkMaps,
        cerita_singkat: ceritaSingkat,
        rekening_qris: rekening,
        catatan,
        whatsapp,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 p-md-4 bg-white rounded-4 shadow-sm border">
      <div className="text-center mb-4">
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-2">
          {selectedDesain?.name} — Paket {selectedPaket.name}
        </span>
        <h2 className="fw-bold h3">Detail Undangan</h2>
      </div>

      {ada('Mempelai') && (
        <>
          <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Mempelai</h6>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className={labelClass}>Nama Lengkap Mempelai Pria *</label>
              <input className={`${inputClass} p-3`} value={namaPria} onChange={(e) => setNamaPria(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className={labelClass}>Nama Lengkap Mempelai Wanita *</label>
              <input className={`${inputClass} p-3`} value={namaWanita} onChange={(e) => setNamaWanita(e.target.value)} />
            </div>
            <div className="col-12">
              <label className={labelClass}>Nama Panggilan (misal: Alfin & Nadya) *</label>
              <input className={`${inputClass} p-3`} value={namaPanggilan} onChange={(e) => setNamaPanggilan(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className={labelClass}>Nama Ayah & Ibu — Pihak Pria *</label>
              <input className={`${inputClass} p-3`} placeholder="Bapak X & Ibu Y" value={ortuPria} onChange={(e) => setOrtuPria(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className={labelClass}>Nama Ayah & Ibu — Pihak Wanita *</label>
              <input className={`${inputClass} p-3`} placeholder="Bapak X & Ibu Y" value={ortuWanita} onChange={(e) => setOrtuWanita(e.target.value)} />
            </div>
          </div>
        </>
      )}

      <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Tanggal</h6>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <label className={labelClass}>Tanggal Pernikahan *</label>
          <input type="date" className={`${inputClass} p-3`} value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </div>
      </div>

      {ada('Detail Acara (Akad & Resepsi)') && (
        <>
          <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Detail Acara</h6>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className={labelClass}>Jam Akad *</label>
              <input className={`${inputClass} p-3`} placeholder="08.00 WIB" value={jamLokasiAkad} onChange={(e) => setJamLokasiAkad(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className={labelClass}>Jam Resepsi *</label>
              <input className={`${inputClass} p-3`} placeholder="10.00 WIB" value={jamLokasiResepsi} onChange={(e) => setJamLokasiResepsi(e.target.value)} />
            </div>
            <div className="col-12">
              <label className={labelClass}>Alamat Akad *</label>
              <textarea className={`${inputClass} p-3`} style={{ resize: 'none' }} rows="2" value={alamatAkad} onChange={(e) => setAlamatAkad(e.target.value)} />
            </div>
            <div className="col-12">
              <label className={labelClass}>Alamat Resepsi *</label>
              <textarea className={`${inputClass} p-3`} style={{ resize: 'none' }} rows="2" value={alamatResepsi} onChange={(e) => setAlamatResepsi(e.target.value)} />
            </div>
            <div className="col-12">
              <label className={labelClass}>Link Google Maps (opsional)</label>
              <input className={`${inputClass} p-3`} placeholder="https://maps.google.com/..." value={linkMaps} onChange={(e) => setLinkMaps(e.target.value)} />
            </div>
          </div>
        </>
      )}

      {ada('Our Story / Timeline') && (
        <>
          <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Cerita Kalian</h6>
          <div className="mb-4">
            <label className={labelClass}>Cerita Singkat (opsional)</label>
            <textarea className={`${inputClass} p-3`} style={{ resize: 'none' }} rows="3" placeholder="Awal bertemu, lamaran, menuju halal..." value={ceritaSingkat} onChange={(e) => setCeritaSingkat(e.target.value)} />
          </div>
        </>
      )}

      {ada('Galeri Foto') && (
        <div className="mb-4 p-3 bg-light rounded-3">
          <p className="fw-semibold mb-1">📷 Galeri Foto</p>
          <p className="text-secondary small mb-0">
            Kirim 3-6 foto terbaik via WhatsApp setelah submit pengajuan ini.
          </p>
        </div>
      )}

      {ada('Wedding Gift / Amplop Digital') && (
        <>
          <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Wedding Gift</h6>
          <div className="mb-4">
            <label className={labelClass}>Nomor Rekening / QRIS *</label>
            <input className={`${inputClass} p-3`} placeholder="BCA 1234567890 a.n. Alfin" value={rekening} onChange={(e) => setRekening(e.target.value)} />
          </div>
        </>
      )}

      <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Kontak & Kirim</h6>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className={labelClass}>WhatsApp *</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0 text-success"><i className="bi bi-whatsapp fs-5"></i></span>
            <input className={`${inputClass} border-start-0`} placeholder="0812..." value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <label className={labelClass}>Catatan Tambahan</label>
          <textarea className={`${inputClass} p-3`} style={{ resize: 'none' }} rows="1" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
        </div>
      </div>

      {error && <div className="alert alert-danger py-2 small mb-3"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}

      <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm" disabled={submitting}>
        {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Mengirim...</> : 'Kirim Pengajuan'}
      </button>
    </form>
  );
}