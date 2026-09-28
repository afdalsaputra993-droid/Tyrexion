'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const STATUS_LABEL = {
  pending: 'Menunggu Review',
  approved: 'Disetujui',
  in_progress: 'Sedang Dikerjakan',
  completed: 'Selesai',
  rejected: 'Ditolak',
  expired: 'Kadaluarsa',
};

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

export default function ProjectDetailModal({ project, onClose, onDeleted }) {
  const supabase = createClient();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [offers, setOffers] = useState([]);
  const [choosing, setChoosing] = useState(false);
  const [choiceError, setChoiceError] = useState('');

  const isActive = project && ['pending', 'approved', 'in_progress'].includes(project.status);
  const needsChoice = isActive && project?.domain_status === 'offered';

  useEffect(() => {
    if (!project) return;
    if (!needsChoice) {
      setOffers([]);
      return;
    }
    async function fetchOffers() {
      const { data } = await supabase
        .from('domain_offers')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: true });
      setOffers(data || []);
    }
    fetchOffers();
  }, [project?.id, needsChoice]);

  if (!project) return null;

  const data = project.form_data || {};
  const bisaDihapus = ['pending', 'rejected', 'expired'].includes(project.status);

  const total = (project.package_price || 0) +
    (project.domain_status === 'chosen' ? (project.selected_domain_price || 0) : 0);

  const handleChoose = async (offerId) => {
    setChoosing(true);
    setChoiceError('');

    const { error: rpcErr } = await supabase.rpc('choose_domain', {
      p_project_id: project.id,
      p_offer_id: offerId,
    });

    if (rpcErr) {
      setChoiceError('Gagal menyimpan pilihan: ' + rpcErr.message);
      setChoosing(false);
      return;
    }

    setChoosing(false);
    onDeleted(); // reuse: refresh daftar project di parent
    onClose();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError('');

    try {
      if (project.status === 'pending') {
        const { error: delErr } = await supabase.rpc('delete_pending_project', {
          p_project_id: project.id,
        });
        if (delErr) throw delErr;

      } else if (project.status === 'rejected' || project.status === 'expired') {
        const { error: delErr } = await supabase.from('rejected_projects').delete().eq('id', project.id);
        if (delErr) throw delErr;
      }

      onDeleted();
      onClose();
    } catch (err) {
      setError('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{data.nama_bisnis || 'Detail Project'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p><strong>Status:</strong> {STATUS_LABEL[project.status] || project.status}</p>
            <p><strong>Paket:</strong> {project.package} ({rupiah(project.package_price)})</p>
            <p><strong>Kategori Bisnis:</strong> {data.kategori_bisnis || '-'}</p>
            <p><strong>Target Konsumen:</strong> {data.target_konsumen || '-'}</p>
            <p><strong>Preferensi Warna:</strong> {data.warna || '-'}</p>
            <p><strong>Section:</strong> {data.sections?.join(', ') || '-'}</p>
            <p><strong>Deskripsi:</strong> {data.deskripsi || '-'}</p>
            <p><strong>Referensi:</strong> {data.referensi || '-'}</p>
            <p><strong>Catatan:</strong> {data.catatan || '-'}</p>
            <p><strong>WhatsApp:</strong> {data.whatsapp || '-'}</p>
            <p><strong>Poin:</strong> {project.complexity_points}</p>

            <hr />

            {project.domain_status === 'chosen' && (
              <p><strong>Domain:</strong> {project.selected_domain_name} ({rupiah(project.selected_domain_price)})</p>
            )}
            {project.domain_status === 'skipped' && (
              <p className="text-muted"><strong>Domain:</strong> Tanpa domain custom (alamat gratis)</p>
            )}
            {isActive && project.domain_status === 'waiting' && (
              <p className="text-muted small">
                Menunggu admin mengirim pilihan domain, akan diberitahukan lewat WhatsApp.
              </p>
            )}

            {needsChoice && (
              <div className="p-3 bg-light rounded-3 mb-2">
                <p className="fw-semibold mb-2">Admin sudah mengirim pilihan domain:</p>
                {offers.map((o) => (
                  <button
                    key={o.id}
                    className="btn btn-outline-primary w-100 mb-2 d-flex justify-content-between"
                    onClick={() => handleChoose(o.id)}
                    disabled={choosing}
                  >
                    <span>{o.domain_name}</span>
                    <span>{rupiah(o.price)}</span>
                  </button>
                ))}
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => handleChoose(null)}
                  disabled={choosing}
                >
                  Tanpa domain custom (alamat gratis)
                </button>
                {choiceError && <p className="text-danger small mt-2 mb-0">{choiceError}</p>}
              </div>
            )}

            <p className="fw-bold fs-5 mt-3">Total: {rupiah(total)}</p>

            {error && <p className="text-danger">{error}</p>}
          </div>

          <div className="modal-footer">
            {bisaDihapus && (
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Menghapus...' : 'Hapus Project'}
              </button>
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}