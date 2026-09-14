'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_CONFIG = {
  pending: { label: 'Menunggu Review', class: 'bg-warning text-dark' },
  approved: { label: 'Disetujui', class: 'bg-info text-dark' },
  in_progress: { label: 'Sedang Dikerjakan', class: 'bg-primary text-white' },
  completed: { label: 'Selesai', class: 'bg-success text-white' },
  rejected: { label: 'Ditolak', class: 'bg-danger text-white' },
  expired: { label: 'Kadaluarsa', class: 'bg-secondary text-white' },
};

export default function ProjectDetailModal({ project, onClose, onDeleted }) {
  const supabase = createClient();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!project) return null;

  const data = project.form_data || {};
  const bisaDihapus = ['pending', 'rejected', 'expired'].includes(project.status);
  const statusInfo = STATUS_CONFIG[project.status] || { label: project.status, class: 'bg-secondary' };

  const handleDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus project ini? Tindakan ini tidak dapat dibatalkan.')) return;

    setDeleting(true);
    setError('');

    try {
      if (project.status === 'pending') {
        const { error } = await supabase.rpc('delete_pending_project', { p_project_id: project.id });
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

  // Helper untuk menampilkan info
  const InfoRow = ({ label, value, isLast = false }) => (
    <div className={`row ${!isLast ? 'mb-3' : ''}`}>
      <div className="col-sm-4 text-muted small fw-bold">{label}</div>
      <div className="col-sm-8 text-dark">{value || '-'}</div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal d-block"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="modal-dialog modal-dialog-centered modal-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            
            {/* Header Modal */}
            <div className="modal-header bg-light border-bottom-0 px-4 py-3">
              <div>
                <h5 className="modal-title fw-bold mb-1">{data.nama_bisnis || 'Project Tanpa Nama'}</h5>
                <span className={`badge ${statusInfo.class} rounded-pill px-3 py-2`}>
                  {statusInfo.label}
                </span>
              </div>
              <button type="button" className="btn-close bg-dark bg-opacity-10 rounded-circle p-2" onClick={onClose}></button>
            </div>

            {/* Body Modal */}
            <div className="modal-body p-4">
              
              {/* Bagian 1: Ringkasan Paket & Poin */}
              <div className="row g-3 mb-4 p-3 bg-light rounded-3 mx-1">
                <div className="col-md-6 border-end">
                  <small className="text-muted d-block">Paket Dipilih</small>
                  <span className="fw-bold text-primary fs-5">{project.package}</span>
                </div>
                <div className="col-md-6">
                  <small className="text-muted d-block">Tingkat Kompleksitas</small>
                  <span className="fw-bold text-dark fs-5">{project.complexity_points} Poin</span>
                </div>
              </div>

              {/* Bagian 2: Detail Bisnis */}
              <h6 className="fw-bold text-primary mb-3 ps-2 border-start border-4 border-primary">Detail Bisnis</h6>
              <InfoRow label="Kategori" value={data.kategori_bisnis} />
              <InfoRow label="Target Konsumen" value={data.target_konsumen} />
              <InfoRow label="Preferensi Warna" value={data.warna} isLast />

              {/* Bagian 3: Struktur Website */}
              <h6 className="fw-bold text-primary mb-3 mt-4 ps-2 border-start border-4 border-primary">Struktur Website</h6>
              <div className="mb-3">
                <small className="text-muted d-block mb-2">Section yang Dipilih:</small>
                <div className="d-flex flex-wrap gap-2">
                  {data.sections && data.sections.length > 0 ? (
                    data.sections.map((sec, i) => (
                      <span key={i} className="badge bg-white border text-secondary px-3 py-2 rounded-pill shadow-sm">
                        {sec}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted fst-italic">Tidak ada section dipilih</span>
                  )}
                </div>
              </div>
              <InfoRow label="Deskripsi" value={data.deskripsi} />
              <InfoRow label="Referensi Desain" value={data.referensi ? <a href={data.referensi} target="_blank" rel="noreferrer" className="text-decoration-none"><i className="bi bi-link-45deg me-1"></i>Lihat Link</a> : '-'} />
              <InfoRow label="Catatan Tambahan" value={data.catatan} isLast />

              {/* Bagian 4: Kontak */}
              <h6 className="fw-bold text-primary mb-3 mt-4 ps-2 border-start border-4 border-primary">Kontak Klien</h6>
              <div className="d-flex align-items-center bg-light p-3 rounded-3">
                <i className="bi bi-whatsapp text-success fs-4 me-3"></i>
                <div>
                  <small className="text-muted d-block">WhatsApp</small>
                  <span className="fw-bold text-dark">{data.whatsapp || '-'}</span>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mt-3 py-2 small d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="modal-footer bg-light border-top-0 px-4 py-3 justify-content-between">
              <small className="text-muted">ID: {project.id.slice(0, 8)}...</small>
              <div>
                {bisaDihapus && (
                  <button
                    className="btn btn-outline-danger me-2 px-4 rounded-pill"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? <><span className="spinner-border spinner-border-sm me-2"></span>Menghapus...</> : 'Hapus Project'}
                  </button>
                )}
                <button className="btn btn-secondary px-4 rounded-pill" onClick={onClose}>
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
