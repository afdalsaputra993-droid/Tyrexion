'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSidebar } from "@/context/SidebarContext";

// Menu utama
const mainMenu = [
  { name: 'HOME', href: '/' },
  { name: 'TENTANG', href: '/tentang' },
  { name: 'PAKET', href: '/paket' },
]

// Sub-menu untuk Legal
const legalMenu = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-conditions' },
]

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // State untuk mengontrol dropdown Legal
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  useEffect(() => setMounted(true), [])

  // Helper untuk mengecek apakah link aktif (termasuk sub-menu)
  const isLinkActive = (href) => mounted && pathname === href;
  
  // Cek apakah salah satu submenu legal sedang aktif untuk highlight parent
  const isLegalParentActive = legalMenu.some(item => pathname === item.href);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
         <motion.div
          onClick={toggle}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          style={{zIndex: "1020"}}
          className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50"
          />
        )}
      </AnimatePresence>

    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      
      // Drag features
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100 || info.velocity.x > 500) {
          toggle()
        }
      }}
      
      className="p-4 position-fixed top-0 end-0 vh-100 bg-white shadow-lg d-lg-none overflow-y-auto"
      style={{width: "280px", zIndex: 1030, touchAction: 'pan-y' }}
    >
      <div className="container-fluid">
         <ul className="navbar-nav gap-1">
            
            {/* Render Menu Utama */}
            {mainMenu.map((item) => {
              const isActive = isLinkActive(item.href)
              
              return (
                <li key={item.name} className="nav-item">
                  <Link
                    href={item.href}
                    onClick={toggle}
                    className={`nav-link fw-semibold py-3 px-2 d-block position-relative ${
                      isActive ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {item.name}
                    
                    {isActive && (
                      <motion.span 
                        layoutId="sidebar-indicator"
                        className="position-absolute bottom-0 start-0 bg-primary rounded"
                        style={{ height: '3px', width: '100%' }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}

            {/* MENU DROPDOWN LEGAL */}
            <li className="nav-item mt-2 border-top pt-2">
              {/* Tombol Pemicu Dropdown */}
              <div 
                className={`nav-link fw-semibold py-3 px-2 d-block position-relative cursor-pointer ${
                  isLegalParentActive ? 'text-primary' : 'text-secondary'
                }`}
                onClick={() => setIsLegalOpen(!isLegalOpen)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>LEGAL</span>
                  {/* Icon Panah Sederhana */}
                  <motion.span
                    animate={{ rotate: isLegalOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="fs-6"
                  >
                    ▼
                  </motion.span>
                </div>

                {/* Indikator Aktif untuk Parent jika submenu aktif */}
                {isLegalParentActive && (
                   <motion.span 
                    layoutId="sidebar-indicator-legal"
                    className="position-absolute bottom-0 start-0 bg-primary rounded"
                    style={{ height: '3px', width: '100%' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>

              {/* Konten Dropdown */}
              <AnimatePresence>
                {isLegalOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="list-unstyled ps-3 mb-0 overflow-hidden"
                  >
                    {legalMenu.map((subItem) => {
                      const isSubActive = isLinkActive(subItem.href);
                      return (
                        <li key={subItem.name} className="mb-1">
                          <Link
                            href={subItem.href}
                            onClick={toggle} // Tutup sidebar saat link diklik
                            className={`d-block py-2 px-2 text-decoration-none small ${
                              isSubActive ? 'text-primary fw-bold' : 'text-muted'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      )
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

         </ul>
      </div>
    </motion.aside>
    </>
  )
}
