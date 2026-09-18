import { motion, AnimatePresence } from 'framer-motion' // Kita butuh AnimatePresence lagi untuk animasi dropdown
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const mainMenu = [
  { name: 'HOME', href: '/' },
  { name: 'TENTANG', href: '/tentang' },
  { name: 'PAKET', href: '/paket' },
]

const legalMenu = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-conditions' },
]

export default function DesktopMenu() {
  const pathname = usePathname();
  const [isLegalHovered, setIsLegalHovered] = useState(false);

  // Helper cek aktif
  const isLinkActive = (href) => pathname === href;
  const isLegalParentActive = legalMenu.some(item => pathname === item.href);
  
  return (
    <ul className="navbar-nav position-relative gap-3 d-none d-md-flex flex-row justify-content-around mx-auto align-items-center">
      
      {/* Render Menu Utama */}
      {mainMenu.map((item) => {
        const isActive = isLinkActive(item.href)
        
        return (
          <li key={item.name} className="nav-item position-relative">
            <Link
              href={item.href}
              className={`nav-link fw-semibold py-3 px-2 d-block ${
                isActive ? 'text-primary' : 'text-secondary'
              }`}
            >
              {item.name}
            </Link>

            {isActive && (
              <motion.div
                layoutId="navbar-indicator" 
                className="position-absolute bottom-0 start-0 bg-primary rounded"
                style={{ height: '3px', width: '100%' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        )
      })}

      {/* MENU DROPDOWN LEGAL (DESKTOP) */}
      <li 
        className="nav-item position-relative"
        onMouseEnter={() => setIsLegalHovered(true)}
        onMouseLeave={() => setIsLegalHovered(false)}
      >
        <div 
          className={`nav-link fw-semibold py-3 px-2 d-block cursor-pointer ${
            isLegalParentActive ? 'text-primary' : 'text-secondary'
          }`}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>LEGAL</span>
          {/* Icon Panah Kecil */}
          <motion.span
            animate={{ rotate: isLegalHovered ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '0.7em' }}
          >
            ▼
          </motion.span>

          {/* Indikator Garis Bawah jika salah satu sub-menu aktif */}
          {isLegalParentActive && (
            <motion.div
              layoutId="navbar-indicator-legal" 
              className="position-absolute bottom-0 start-0 bg-primary rounded"
              style={{ height: '3px', width: '100%' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>

        {/* Dropdown Content */}
        <AnimatePresence>
          {isLegalHovered && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="list-unstyled position-absolute top-100 start-50 translate-middle-x mt-2 p-2 bg-white shadow rounded"
              style={{ minWidth: '200px', zIndex: 1050 }}
            >
              {legalMenu.map((subItem) => {
                const isSubActive = isLinkActive(subItem.href);
                return (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={`d-block px-3 py-2 text-decoration-none rounded ${
                        isSubActive 
                          ? 'bg-primary bg-opacity-10 text-primary fw-bold' 
                          : 'text-dark hover-bg-light'
                      }`}
                      style={{ whiteSpace: 'nowrap' }}
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
  )
}
