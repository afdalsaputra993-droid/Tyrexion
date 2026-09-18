'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { createClient } from '@/lib/supabase';

export default function PengaturanPage() {
  const user = useUser();
  const supabase = createClient();

  const [whatsapp, setWhatsapp] = useState('');
  const [namaBisnis, setNamaBisnis] = useState('');
  const [kategoriBisnis, setKategoriBisnis] = useState('');
  const [listKategori, setListKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
const [showModal, setShowModal] = useState(false);
const [confirmText, setConfirmText] = useState('');
const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setWhatsapp(data.whatsapp || '');
        setNamaBisnis(data.nama_bisnis_default || '');
        setKategoriBisnis(data.kategori_bisnis_default || '');
      }

      const { data: kategori } = await supabase
        .from('kategori_bisnis')
        .select('*')
        .eq('is_active', true);
      setListKategori(kategori || []);

      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await supabase.from('user_settings').upsert({
      user_id: user.id,
      whatsapp,
      nama_bisnis_default: namaBisnis,
      kategori_bisnis_default: kategoriBisnis,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setMessage('Gagal menyimpan: ' + error.message);
    } else {
      setMessage('Berhasil disimpan.');
    }
    setSaving(false);
  };

  const handleWhatsApp = () => {
  const pesan = encodeURIComponent('Halo, saya ingin menghapus akun saya di Tyrexion.');
  window.open(`https://wa.me/6283830856078?text=${pesan}`, '_blank');
};

const handleKonfirmasiHapus = async () => {
  setDeleting(true);
  const { error } = await supabase.rpc('delete_own_account');

  if (error) {
    alert('Gagal menghapus akun: ' + error.message);
    setDeleting(false);
    return;
  }

  await supabase.auth.signOut();
  router.push('/');
  router.refresh();
};

  if (loading) return <p className="p-4">Memuat pengaturan...</p>;

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1 className="fw-bold mb-4">Pengaturan</h1>

      <form onSubmit={handleSave} className="card p-4 mb-4 shadow-sm border-0 rounded-4">
        <h5 className="fw-bold mb-3">Data Default</h5>
        <p className="text-secondary small mb-3">
          Data ini akan otomatis mengisi form saat kamu membuat pengajuan project baru.
        </p>

        <div className="mb-3">
          <label className="form-label fw-semibold">Nomor WhatsApp</label>
          <input
            className="form-control"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="0812xxxxxxxx"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Nama Bisnis</label>
          <input
            className="form-control"
            value={namaBisnis}
            onChange={(e) => setNamaBisnis(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Kategori Bisnis</label>
          <select
            className="form-select"
            value={kategoriBisnis}
            onChange={(e) => setKategoriBisnis(e.target.value)}
          >
            <option value="">Pilih kategori</option>
            {listKategori.map((k) => (
              <option key={k.id} value={k.nama_bisnis}>{k.nama_bisnis}</option>
            ))}
          </select>
        </div>

        {message && <p className={message.includes('Gagal') ? 'text-danger' : 'text-success'}>{message}</p>}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>

      <div className="card p-4 border-0 shadow-sm rounded-4 border border-danger-subtle">
  <h5 className="fw-bold text-danger mb-2">Zona Berbahaya</h5>
  <p className="text-secondary small mb-3">
    Ada kendala dengan project Anda? Hubungi kami dulu via WhatsApp sebelum menghapus akun.
  </p>
  <div className="d-flex gap-2">
    <button className="btn btn-outline-secondary" onClick={handleWhatsApp}>
      Hubungi WhatsApp
    </button>
    <button className="btn btn-outline-danger" onClick={() => setShowModal(true)}>
      Hapus Akun
    </button>
  </div>
</div>

{showModal && (
  <div
    className="modal d-block"
    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    onClick={() => setShowModal(false)}
  >
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content rounded-4">
        <div className="modal-header">
          <h5 className="modal-title fw-bold text-danger">Yakin Ingin Menghapus Akun?</h5>
        </div>
        <div className="modal-body">
          <p className="text-secondary">
            Semua riwayat project Anda akan hilang permanen dan tidak bisa dikembalikan.
          </p>
          <label className="form-label fw-semibold">
            Ketik <code>HAPUS AKUN SAYA</code> untuk konfirmasi:
          </label>
          <input
            className="form-control"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="HAPUS AKUN SAYA"
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Batal
          </button>
          <button
            className="btn btn-danger"
            disabled={confirmText !== 'HAPUS AKUN SAYA' || deleting}
            onClick={handleKonfirmasiHapus}
          >
            {deleting ? 'Menghapus...' : 'Konfirmasi Hapus'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}