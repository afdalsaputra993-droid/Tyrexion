'use client'

import { useUser } from '@/context/UserContext';
import Link from 'next/link'
import { createClient } from '@/lib/supabase';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSidebar } from "@/context/SidebarContext";

const menu = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Project Saya', href: '/dashboard/projectsaya' },
  { name: 'Pengaturan', href: '/dashboard/pengaturan' },
]

export default function Sidebar() {
  const user = useUser();
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
    const supabase = createClient();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), [])

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
         <motion.div
          onClick={toggle}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          style={{zIndex: 1020}}
          className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50 d-lg-none"
          />
        )}
      </AnimatePresence>

    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100 || info.velocity.x > 500) {
          toggle()
        }
      }}
      
      className="position-fixed top-0 end-0 bg-white shadow-lg d-lg-none d-flex flex-column"
      style={{width: "280px", zIndex: 1030, touchAction: 'pan-y', height: '100dvh' }}
    >
      {/* 1. PROFIL */}
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
      
      {/* 2. MENU */}
      <nav className="p-3 flex-grow-1 overflow-y-auto">
         <ul className="nav flex-column gap-2">
            {menu.map((item) => {
              const isActive = mounted && pathname === item.href
              
              return (
                <li key={item.name} className="nav-item">
                  <Link
                    href={item.href}
                    onClick={toggle}
                    // KUNCI 1: kasih position-relative di sini
                    className={`nav-link fw-semibold py-2 px-3 rounded-2 d-block position-relative ${
                      isActive ? 'bg-primary-subtle text-primary' : 'text-secondary'
                    }`}
                  >
                    {item.name}
                    
                    {/* KUNCI 2: animasi garis bawah, render terus biar layoutId gak hilang */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-indicator"
                          className="position-absolute bottom-0 start-50 translate-middle-x bg-primary rounded-pill"
                          style={{ height: '3px', width: '80%' }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              )
            })}
         </ul>
      </nav>

      {/* 3. LOGOUT */}
        <div className="p-3 border-top flex-shrink-0 bg-white" 
           style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}> {/* biar gak ketutup gesture bar iPhone */}
        <button 
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
        >
          <i className="bi bi-box-arrow-right"></i> 
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
    </>
  )
}