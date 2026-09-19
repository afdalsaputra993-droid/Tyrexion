import { Geist, Geist_Mono } from "next/font/google";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UserProvider } from "@/context/UserContext";

import "@/styles/custom.scss";
import 'bootstrap-icons/font/bootstrap-icons.css'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tyrexion — Jasa Pembuatan Website Landing Page",
  description: "Tyrexion membantu bisnis Anda tampil profesional online lewat Landing Page berkualitas, mulai Rp 300.000. Try, Expand, Action.",
  keywords: ["jasa website", "jasa pembuatan website", "landing page", "website murah", "jasa web developer"],
  openGraph: {
    title: "Tyrexion — Jasa Pembuatan Website",
    description: "Wujudkan website impian bisnis Anda bersama Tyrexion.",
    url: "https://tyrexion.vercel.app",
    siteName: "Tyrexion",
    locale: "id_ID",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  
const cookieStore = await cookies();
  const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Boleh diabaikan — ini terjadi kalau dipanggil dari Server Component.
          // Session tetap di-refresh lewat middleware.js
        }
      },
    },
  }
);
  const { data: { user } } = await supabase.auth.getUser();

  
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-light">
         <UserProvider user={user}>
        {children}
         </UserProvider>
      </body>
    </html>
  );
}
