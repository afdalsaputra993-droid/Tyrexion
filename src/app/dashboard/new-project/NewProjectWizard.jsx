'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import SlotPenuh from './SlotPenuh';
import StepKategori from './StepKategori';
import StepPaket from './StepPaket';
import StepFormLandingPage from './StepFormLandingPage';
import LoadingSlot from './LoadingSlot'

export default function NewProjectWizard() {
  const supabase = createClient();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [slotPenuh, setSlotPenuh] = useState(false);
  const [step, setStep] = useState(1);
  const [kategori, setKategori] = useState(null);
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
  async function cekKapasitas() {
    const { data } = await supabase
      .from('capacity_settings')
      .select('total_capacity_points, used_points, max_slot')
      .single();

    const { data: slotCount } = await supabase.rpc('get_active_slot_count');

    const poinPenuh = data && data.used_points >= data.total_capacity_points;
    const slotPenuh = data && slotCount >= data.max_slot;

    if (poinPenuh || slotPenuh) {
      setSlotPenuh(true);
    }
    setChecking(false);
  }
  cekKapasitas();
}, []);
  
  const handleSubmitForm = async ({ package_slug, form_data }) => {
  setSubmitting(true);

  const { error } = await supabase.rpc('submit_project', {
    p_package_slug: package_slug,
    p_form_data: form_data,
  });

  if (error) {
    alert('Gagal mengirim: ' + error.message);
    setSubmitting(false);
    return;
  }

  router.push('/dashboard');
  router.refresh();
};

  if (checking) return <LoadingSlot teks="Memeriksa ketersediaan slot..." />;
  if (slotPenuh) return <SlotPenuh />;

  return (
    <div className="p-4" style={{ maxWidth: 500, margin: '0 auto' }}>
      {step === 1 && (
        <StepKategori onNext={(kat) => { setKategori(kat); setStep(2); }} />
      )}
      {step === 2 && (
        <StepPaket onNext={(pkg) => { setSelectedPaket(pkg); setStep(3); }} />
      )}
      {step === 3 && kategori === 'landing_page' && (
        <StepFormLandingPage
          selectedPaket={selectedPaket}
          onSubmit={handleSubmitForm}
          submitting={submitting}
        />
      )}
    </div>
  );
}