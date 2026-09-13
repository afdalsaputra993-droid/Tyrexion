'use client';
import { createClient } from '@/lib/supabase';

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
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4 fw-bold">Masuk ke Akun Kamu</h1>
      <button 
        onClick={handleGoogleLogin} 
        className="btn btn-outline-dark d-flex align-items-center gap-2 px-4 py-2"
      >
        <i className="bi bi-google"></i>
        Login dengan Google
      </button>
    </div>
  );
}