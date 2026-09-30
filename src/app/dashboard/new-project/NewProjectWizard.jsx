'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import SlotPenuh from './SlotPenuh';
import StepKategori from './StepKategori';
import StepPaket from './StepPaket';
import StepFormLandingPage from './StepFormLandingPage';
import StepPaketWedding from './StepPaketWedding';
import StepDesainWedding from './StepDesainWedding';

export default function NewProjectWizard() {
  const supabase = createClient();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [slotPenuh, setSlotPenuh] = useState(false);
  const [step, setStep] = useState(1);
  const [kategori, setKategori] = useState(null);
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [domainChoice, setDomainChoice] = useState(null);
  const [selectedDesain, setSelectedDesain] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function cekKapasitas() {
      const { data } = await supabase
        .from('capacity_settings')
        .select('total_capacity_points, used_points, max_slot')
        .single();

      const { data: slotProyek } = await supabase
        .from('projects')
        .select('*')
        .in('status', ['pending', 'approved', 'in_progress']);

      const poinPenuh = data && data.used_points >= data.total_capacity_points;
      const slotPenuhCek = data && slotProyek && slotProyek.length >= data.max_slot;

      if (poinPenuh || slotPenuhCek) {
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
      p_domain_option_id: domainChoice?.domainOptionId || null,
      p_domain_renewal: domainChoice?.domainRenewal || null,
    });

    if (error) {
      alert('Gagal mengirim: ' + error.message);
      setSubmitting(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  if (checking) return <p className="p-4">Memeriksa ketersediaan slot...</p>;
  if (slotPenuh) return <SlotPenuh />;

  return (
    <div className="p-4" style={{ maxWidth: 500, margin: '0 auto' }}>
      {step === 1 && (
        <StepKategori onNext={(kat) => { setKategori(kat); setStep(2); }} />
      )}

      {/* ALUR LANDING PAGE */}
      {step === 2 && kategori === 'landing_page' && (
        <StepPaket onNext={(pkg, domain) => {
          setSelectedPaket(pkg);
          setDomainChoice(domain);
          setStep(3);
        }} />
      )}
      {step === 3 && kategori === 'landing_page' && (
        <StepFormLandingPage
          selectedPaket={selectedPaket}
          domainChoice={domainChoice}
          onSubmit={handleSubmitForm}
          submitting={submitting}
        />
      )}

      {/* ALUR WEDDING */}
      {step === 2 && kategori === 'wedding' && (
        <StepPaketWedding onNext={(pkg) => {
          setSelectedPaket(pkg);
          setStep(3);
        }} />
      )}
      {step === 3 && kategori === 'wedding' && (
        <StepDesainWedding
          selectedPaket={selectedPaket}
          onNext={(desain) => {
            setSelectedDesain(desain);
            setStep(4);
          }}
        />
      )}
      {step === 4 && kategori === 'wedding' && (
        <div className="text-center p-4">
          <h5 className="fw-bold">Form Wedding — Segera Hadir</h5>
          <p className="text-secondary">
            Desain terpilih: {selectedDesain?.name}. Form isi konten sedang disiapkan.
          </p>
        </div>
      )}
    </div>
  );
}