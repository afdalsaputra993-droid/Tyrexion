'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSidebar } from "@/context/SidebarContext";

const menu = [
  { name: 'HOME', href: '/' },
  { name: 'TENTANG', href: '/tentang' },
  { name: 'PAKET', href: '/paket' },
]

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), [])

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
      
      // 1. TAMBAH DRAG BIAR BISA DI GESER TUTUP
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDragEnd={(e, info) => {
        // kalau geser ke kanan > 100px atau kecepatan > 500, tutup
        if (info.offset.x > 100 || info.velocity.x > 500) {
          toggle()
        }
      }}
      
      className="p-4 position-fixed top-0 end-0 vh-100 bg-white shadow-lg d-lg-none"
      style={{width: "280px", zIndex: 1030, touchAction: 'pan-y' }}
    >
      <div className="container-fluid">
         <ul className="navbar-nav gap-1">
            {menu.map((item) => {
              const isActive = mounted && pathname === item.href
              
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
         </ul>
      </div>
    </motion.aside>
    </>
  )
}