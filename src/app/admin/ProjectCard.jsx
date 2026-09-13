'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';

const STATUS_OPTIONS = ['pending', 'approved', 'in_progress', 'completed', 'rejected', 'expired'];

export default function ProjectCard({ project, onUpdated }) {
  const supabase = createClient();
  const [status, setStatus] = useState(project.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      if (status === 'completed') {
        // Pindah ke completed_projects
        const { error: insertErr } = await supabase.from('completed_projects').insert({
          id: project.id,
          user_id: project.user_id,
          package: project.package,
          complexity_points: project.complexity_points,
          form_data: project.form_data,
          created_at: project.created_at,
        });
        if (insertErr) throw insertErr;

        const { error: deleteErr } = await supabase.from('projects').delete().eq('id', project.id);
        if (deleteErr) throw deleteErr;

      } else if (status === 'rejected' || status === 'expired') {
        // Pindah ke rejected_projects
        const { error: insertErr } = await supabase.from('rejected_projects').insert({
          id: project.id,
          user_id: project.user_id,
          package: project.package,
          complexity_points: project.complexity_points,
          form_data: project.form_data,
          created_at: project.created_at,
          final_status: status,
        });
        if (insertErr) throw insertErr;

        const { error: deleteErr } = await supabase.from('projects').delete().eq('id', project.id);
        if (deleteErr) throw deleteErr;

      } else {
        // Update biasa (pending/approved/in_progress)
        const { error: updateErr } = await supabase
          .from('projects')
          .update({ status })
          .eq('id', project.id);
        if (updateErr) throw updateErr;
      }

      onUpdated(); // refresh list di parent
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

      <div className="d-flex gap-2 align-items-center">
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}