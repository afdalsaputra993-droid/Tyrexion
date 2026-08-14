import { motion } from 'framer-motion' // 1. HAPUS AnimatePresence
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menu = [
  { name: 'HOME', href: '/' },
  { name: 'TENTANG', href: '/tentang' },
  { name: 'PAKET', href: '/paket' },
]


export default function DesktopMenu() {
  const pathname = usePathname();

  
  return (
    <ul className="navbar-nav position-relative gap-3 d-none d-md-flex flex-row justify-content-around mx-auto">
            {menu.map((item) => {
              const isActive = pathname === item.href // 2. SIMPELIN AJA
              
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

                  {/* 3. HAPUS AnimatePresence. LANGSUNG MOTION.DIV AJA */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator" // 4. GANTI NAMA BIAR BEDA SAMA SIDEBAR
                      className="position-absolute bottom-0 start-0 bg-primary rounded"
                      style={{ height: '3px', width: '100%' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </li>
              )
            })}
         </ul>
  )
}