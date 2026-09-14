'use client';

import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light position-relative overflow-hidden">
      
      {/* Background Decorations (Opsional, untuk estetika) */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-5" style={{ zIndex: 0 }}></div>
      
      {/* Tombol Kembali ke Home */}
      <Link href="/" className="position-absolute top-0 start-0 m-4 btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
        <i className="bi bi-arrow-left fs-5 text-primary"></i>
      </Link>

      {/* Kartu Login */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card border-0 shadow-lg p-4 p-md-5 text-center"
        style={{ maxWidth: '450px', width: '90%', zIndex: 1, borderRadius: '20px' }}
      >
        <div className="mb-4">
          {/* Logo atau Ikon Aplikasi */}
          <div className="bg-primary bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
            <i className="bi bi-person-workspace text-primary display-6"></i>
          </div>
          
          <h2 className="fw-bold mb-2">Selamat Datang</h2>
          <p className="text-muted small">Silakan masuk untuk melanjutkan pembuatan website Anda.</p>
        </div>

        {/* Tombol Google Login */}
        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-white border w-100 py-3 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-3 hover-shadow transition-all"
          style={{ backgroundColor: '#fff', fontWeight: '500' }}
        >
          {/* SVG Icon Google Asli agar terlihat profesional */}
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Masuk dengan Google</span>
        </button>

        <p className="mt-4 text-muted small mb-0">
          Dengan masuk, Anda menyetujui <a href="#" className="text-decoration-none">Syarat & Ketentuan</a> kami.
        </p>
      </motion.div>
    </div>
  );
}
