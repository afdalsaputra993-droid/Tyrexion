'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';

const STATUS_LABEL = {
  pending: 'Menunggu Review',
  approved: 'Disetujui',
  in_progress: 'Sedang Dikerjakan',
  completed: 'Selesai',
  rejected: 'Ditolak',
  expired: 'Kadaluarsa',
};

export default function ProjectDetailModal({ project, onClose, onDeleted }) {
  const supabase = createClient();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!project) return null;

  const data = project.form_data || {};
  const bisaDihapus = ['pending', 'rejected', 'expired'].includes(project.status);

  const handleDelete = async () => {
  setDeleting(true);
  setError('');

  try {
    if (project.status === 'pending') {
      const { error } = await supabase.rpc('delete_pending_project', {
        p_project_id: project.id,
      });
      if (error) throw error;

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
            <p><strong>Paket:</strong> {project.package}</p>
            <p><strong>Kategori Bisnis:</strong> {data.kategori_bisnis || '-'}</p>
            <p><strong>Target Konsumen:</strong> {data.target_konsumen || '-'}</p>
            <p><strong>Preferensi Warna:</strong> {data.warna || '-'}</p>
            <p><strong>Section:</strong> {data.sections?.join(', ') || '-'}</p>
            <p><strong>Deskripsi:</strong> {data.deskripsi || '-'}</p>
            <p><strong>Referensi:</strong> {data.referensi || '-'}</p>
            <p><strong>Catatan:</strong> {data.catatan || '-'}</p>
            <p><strong>WhatsApp:</strong> {data.whatsapp || '-'}</p>
            <p><strong>Poin:</strong> {project.complexity_points}</p>

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