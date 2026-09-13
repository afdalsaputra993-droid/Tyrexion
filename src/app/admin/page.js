'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import ProjectCard from './ProjectCard';

export default function AdminPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="p-4">Memuat pengajuan...</p>;

  return (
    <div className="p-4">
      <h1 className="fw-bold mb-4">Daftar Pengajuan</h1>
      {projects.length === 0 && <p className="text-secondary">Belum ada pengajuan aktif.</p>}
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onUpdated={fetchProjects} />
      ))}
    </div>
  );
}