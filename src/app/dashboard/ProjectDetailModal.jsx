'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const STATUS_OPTIONS = ['pending', 'approved', 'in_progress', 'completed', 'rejected', 'expired'];

const DOMAIN_BADGE = {
  waiting: { label: 'Belum ada penawaran', class: 'bg-secondary' },
  offered: { label: 'Menunggu pilihan user', class: 'bg-warning text-dark' },
  chosen: { label: 'Domain dipilih', class: 'bg-success' },
  skipped: { label: 'Tanpa domain custom', class: 'bg-info text-dark' },
};

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

export default function ProjectCard({ project, onUpdated }) {
  const supabase = createClient();
  const [status, setStatus] = useState(project.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [offers, setOffers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [offerBusy, setOfferBusy] = useState(false);
  const [offerError, setOfferError] = useState('');

  useEffect(() => {
    async function fetchOffers() {
      const { data } = await supabase
        .from('domain_offers')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: true });
      setOffers(data || []);
    }
    fetchOffers();
  }, [project.id]);

  const locked = ['chosen', 'skipped'].includes(project.domain_status);
  const domainStatus = locked
    ? project.domain_status
    : offers.length > 0 ? 'offered' : 'waiting';
  const domainBadge = DOMAIN_BADGE[domainStatus];
  const startBlocked = status === 'in_progress' && !locked;

  const handleAddOffer = async () => {
    setOfferError('');
    const name = newName.trim();
    const price = parseInt(newPrice, 10);

    if (!name || Number.isNaN(price) || price < 0) {
      setOfferError('Isi nama domain dan harga (angka) dengan benar.');
      return;
    }

    setOfferBusy(true);
    const { data, error: insertErr } = await supabase
      .from('domain_offers')
      .insert({ project_id: project.id, domain_name: name, price })
      .select()
      .single();

    if (insertErr) {
      setOfferError('Gagal menambah penawaran: ' + insertErr.message);
    } else {
      setOffers((prev) => [...prev, data]);
      setNewName('');
      setNewPrice('');
    }
    setOfferBusy(false);
  };

  const handleDeleteOffer = async (offerId) => {
    setOfferError('');
    setOfferBusy(true);

    const { data: deleted, error: delErr } = await supabase
      .from('domain_offers')
      .delete()
      .eq('id', offerId)
      .select();

    if (delErr) {
      setOfferError('Gagal menghapus: ' + delErr.message);
    } else if (!deleted || deleted.length === 0) {
      setOfferError('Penawaran tidak bisa dihapus (mungkin sudah terkunci).');
    } else {
      setOffers((prev) => prev.filter((o) => o.id !== offerId));
    }
    setOfferBusy(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const salinan = {
        id: project.id,
        user_id: project.user_id,
        package: project.package,
        complexity_points: project.complexity_points,
        form_data: project.form_data,
        created_at: project.created_at,
        package_price: project.package_price,
        domain_status: project.domain_status,
        selected_domain_name: project.selected_domain_name,
        selected_domain_price: project.selected_domain_price,
      };

      if (status === 'completed') {
        const { error: insertErr } = await supabase.from('completed_projects').insert(salinan);
        if (insertErr) throw insertErr;

        const { error: deleteErr } = await supabase.from('projects').delete().eq('id', project.id);
        if (deleteErr) throw deleteErr;

      } else if (status === 'rejected' || status === 'expired') {
        const { error: insertErr } = await supabase
          .from('rejected_projects')
          .insert({ ...salinan, final_status: status });
        if (insertErr) throw insertErr;

        const { error: deleteErr } = await supabase.from('projects').delete().eq('id', project.id);
        if (deleteErr) throw deleteErr;

      } else {
        const { error: updateErr } = await supabase
          .from('projects')
          .update({ status })
          .eq('id', project.id);
        if (updateErr) throw updateErr;
      }

      onUpdated();
    } catch (err) {
      setError('Gagal update: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const data = project.form_data || {};

  return (
    <div className="card p-3 mb-3">
      <h5 className="fw-bold">{data.nama_bisnis}</h5>
      <p className="mb-1"><strong>Paket:</strong> {project.package}</p>
      <p className="mb-1"><strong>Kategori Bisnis:</strong> {data.kategori_bisnis}</p>
      <p className="mb-1"><strong>Target Konsumen:</strong> {data.target_konsumen}</p>
      <p className="mb-1"><strong>Warna:</strong> {data.warna || '-'}</p>
      <p className="mb-1"><strong>Section:</strong> {data.sections?.join(', ')}</p>
      <p className="mb-1"><strong>Deskripsi:</strong> {data.deskripsi}</p>
      <p className="mb-1"><strong>Referensi:</strong> {data.referensi || '-'}</p>
      <p className="mb-1"><strong>Catatan:</strong> {data.catatan || '-'}</p>
      <p className="mb-1"><strong>WhatsApp:</strong> {data.whatsapp}</p>
      <p className="mb-3"><strong>Poin:</strong> {project.complexity_points}</p>

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0">Penawaran Domain</h6>
        <span className={`badge rounded-pill ${domainBadge.class}`}>{domainBadge.label}</span>
      </div>

      {domainStatus === 'chosen' && (
        <p className="mb-2">
          <strong>Dipilih user:</strong> {project.selected_domain_name} ({rupiah(project.selected_domain_price)})
        </p>
      )}
      {domainStatus === 'skipped' && (
        <p className="mb-2 text-muted">User memilih tanpa domain custom (alamat gratis).</p>
      )}

      {offers.length > 0 && (
        <ul className="list-group mb-2">
          {offers.map((o) => (
            <li key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{o.domain_name} — {rupiah(o.price)}</span>
              {!locked && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteOffer(o.id)}
                  disabled={offerBusy}
                >
                  Hapus
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!locked && (
        <div className="row g-2 mb-2">
          <div className="col-12 col-md-6">
            <input
              className="form-control"
              placeholder="Nama domain, misal kopisenja.com"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="col-7 col-md-3">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Harga (Rp)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="col-5 col-md-3">
            <button className="btn btn-outline-primary w-100" onClick={handleAddOffer} disabled={offerBusy}>
              Tambah
            </button>
          </div>
        </div>
      )}
      {offerError && <p className="text-danger small">{offerError}</p>}

      <hr />

      <div className="d-flex gap-2 align-items-center">
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving || startBlocked}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {startBlocked && (
        <p className="text-danger small mt-2 mb-0">
          Belum bisa dikerjakan: user harus memilih domain (atau tanpa domain custom) dulu.
        </p>
      )}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}