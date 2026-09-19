'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import ProjectDetailModal from '@dashboard/ProjectDetailModal';

const STATUS_BADGE = {
  pending: { label: 'Menunggu Review', class: 'bg-warning text-dark' },
  approved: { label: 'Disetujui', class: 'bg-info text-dark' },
  in_progress: { label: 'Sedang Dikerjakan', class: 'bg-primary' },
  completed: { label: 'Selesai', class: 'bg-success' },
  rejected: { label: 'Ditolak', class: 'bg-danger' },
  expired: { label: 'Kadaluarsa', class: 'bg-secondary' },
};

const FILTER_TABS = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Menunggu' },
  { key: 'approved', label: 'Disetujui' },
  { key: 'in_progress', label: 'Dikerjakan' },
  { key: 'completed', label: 'Selesai' },
  { key: 'rejected', label: 'Ditolak' },
  { key: 'expired', label: 'Kadaluarsa' },
];

export default function ProjectSayaPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchAllProjects = async () => {
    setLoading(true);
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const [aktif, selesai, ditolak] = await Promise.all([
      supabase.from('projects').select('*').eq('user_id', currentUser.id),
      supabase.from('completed_projects').select('*').eq('user_id', currentUser.id),
      supabase.from('rejected_projects').select('*').eq('user_id', currentUser.id),
    ]);

    const gabungan = [
      ...(aktif.data || []),
      ...(selesai.data || []).map(p => ({ ...p, status: 'completed' })),
      ...(ditolak.data || []).map(p => ({ ...p, status: p.final_status || 'rejected' })),
    ];

    gabungan.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setProjects(gabungan);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.status === activeFilter);

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Project Saya</h1>

      {/* Tab Filter */}
      <div className="d-flex gap-2 flex-wrap mb-4" style={{ overflowX: 'auto' }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`btn btn-sm rounded-pill px-3 ${
              activeFilter === tab.key ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted">Memuat project...</p>
      ) : filteredProjects.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 bg-light">
          <div className="card-body p-5 text-center">
            <i className="bi bi-folder-x text-muted" style={{ fontSize: '48px' }}></i>
            <h4 className="fs-6 fw-semibold mt-3 mb-1">Tidak ada project</h4>
            <p className="text-muted small mb-0">
              {activeFilter === 'all' ? 'Belum ada project di kategori ini' : `Tidak ada project dengan status "${FILTER_TABS.find(t => t.key === activeFilter)?.label}"`}
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {filteredProjects.map((project) => {
            const badge = STATUS_BADGE[project.status] || { label: project.status, class: 'bg-secondary' };
            const data = project.form_data || {};
            return (
              <div
                key={project.id}
                className="col-12"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1 fw-semibold">{data.nama_bisnis || 'Tanpa Nama'}</h5>
                      <p className="mb-0 text-muted small text-capitalize">
                        Paket {project.package}
                      </p>
                    </div>
                    <span className={`badge rounded-pill ${badge.class}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDeleted={fetchAllProjects}
      />
    </div>
  );
}