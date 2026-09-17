"use client";
import { useUser } from '@/context/UserContext';
import Link from "next/link";
import Image from "next/image";
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const menu = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Project Saya', href: '/dashboard/projectsaya' },
  { name: 'Pengaturan', href: '/dashboard/pengaturan' },
]

export default function MenuDrawer() {
    const user = useUser();
    const pathname = usePathname();
  const router = useRouter();
    const supabase = createClient();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true)
    }, [])

    const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

    return (
        <aside
            className="position-sticky top-0 vh-100 bg-white border-end shadow-sm d-none d-md-flex z-3 flex-column"
            style={{ width: "260px", minWidth: "260px" }}
        >
            {/* BAGIAN PROFIL */}
                  <div className="d-flex w-100 gap-3 align-items-center border-bottom p-3">
  <Image 
    src={user.user_metadata?.avatar_url}
    alt="Profil" 
    className="rounded-circle border border-2 border-primary shadow-sm flex-shrink-0" // tambahin flex-shrink-0 biar avatar gak gepeng
    width={50}
    height={50}
    priority
  />
  <div className="min-w-0"> {/* Fix 1: min-w-0 biar div ini bisa mengecil dan wrap */}
    <h2 className="text-dark fs-6 fw-semibold mb-0 text-truncate">{user.user_metadata?.full_name}</h2> {/* nama kepanjangan kasih truncate */}
    <small className="text-secondary text-break d-block"> {/* Fix 2: text-break + d-block biar email turun */}
      {user.user_metadata?.email}
    </small>
  </div>
</div>

            {/* BAGIAN MENU */}
            <nav className="p-3 flex-grow-1 overflow-y-auto">
                <ul className="nav flex-column gap-1">
                  {menu.map((item) => {
                    const isActive = mounted && pathname === item.href
                    
                    return (
                      <li key={item.name} className="nav-item">
                        <Link
                          href={item.href}
                          className={`nav-link fw-semibold py-2 px-3 rounded d-block position-relative ${
                            isActive ? 'bg-primary-subtle text-primary' : 'text-secondary'
                          }`}
                        >
                          {item.name}
                          
                          {isActive && mounted && ( // <- tambahin mounted biar aman
                            <motion.div 
                              layoutId="sidebar-indicator"
                              className="position-absolute top-0 start-0 h-100 bg-primary"
                              style={{ width: '4px', borderRadius: '0 4px 4px 0' }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
            </nav>

            {/* BAGIAN LOGOUT DI BAWAH - FIX HYDRATION */}
            <div className="p-3 border-top mt-auto">
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center fw-semibold"
                style={{gap: '8px'}} // <- jangan pake gap-2 bootstrap, pake inline style
              >
                <span className="bi bi-box-arrow-right" aria-hidden="true"></span>
                <span>Logout</span> {/* <- text dibungkus span sendiri */}
              </button>
            </div>
        </aside>
    );
}