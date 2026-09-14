"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { createClient } from '@/lib/supabase';
import Link from "next/link";
import { motion } from "framer-motion";
import LoadingSlot from "../new-project/LoadingSlot";

import ProjectDetailModal from '../ProjectDetailModal';

const STATUS_BADGE = {
  pending: { label: 'Menunggu Review', class: 'bg-warning text-dark' },
  approved: { label: 'Disetujui', class: 'bg-info text-dark' },
  in_progress: { label: 'Sedang Dikerjakan', class: 'bg-primary' },
  completed: { label: 'Selesai', class: 'bg-success' },
  rejected: { label: 'Ditolak', class: 'bg-danger' },
  expired: { label: 'Kadaluarsa', class: 'bg-secondary' },
};

export default function Overview() {
  const user = useUser();
  const supabase = createClient();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
  async function fetchAllProjects() {
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
  }
  fetchAllProjects();
}, []);
  
  return (
    <div className="container py-4 mt-5">
      {/* 1. Header Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-sm rounded-4 mb-4"
      >
        <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
          <h2 className="fs-4 fw-bold mb-1">
            Welcome, {user.user_metadata?.full_name} 👋
          </h2>
          <p className="text-muted mb-0">Siap memperkenalkan bisnis atau usaha anda?</p>
        </div>
      </motion.div>

      {/* 2. Button Buat Project */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Link
          href="/dashboard/new-project"
          className="btn btn-primary w-100 py-3 rounded-4 shadow-sm fw-semibold mb-4 d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-plus-circle"></i>
          Buat Project Baru
        </Link>
      </motion.div>

      {/* 3. Section Project Saya */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="fs-5 fw-bold mb-3">Project Saya</h3>

        {loading ? (
          <LoadingSlot teks="Memuat project..." />
        ) : projects.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 bg-light">
            <div className="card-body p-5 text-center">
              <i className="bi bi-folder-x text-muted" style={{ fontSize: '48px' }}></i>
              <h4 className="fs-6 fw-semibold mt-3 mb-1">Belum ada project</h4>
              <p className="text-muted small mb-0">Yuk mulai yang pertama</p>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {projects.map((project) => {
              const badge = STATUS_BADGE[project.status] || { label: project.status, class: 'bg-secondary' };
              const data = project.form_data || {};
              return (
                <div key={project.id} className="col-12"
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
      </motion.div>
      <ProjectDetailModal
  project={selectedProject}
  onClose={() => setSelectedProject(null)}
  onDeleted={() => {
    // refresh ulang daftar project
    window.location.reload(); // sementara, bisa diganti re-fetch tanpa reload nanti
  }}
/>
    </div>
  );
}