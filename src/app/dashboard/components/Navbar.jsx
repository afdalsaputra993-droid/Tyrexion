"use client";

import Link from "next/link"

import { useState, useEffect } from "react"
  
import { useSidebar } from "@/context/SidebarContext";
import { motion } from "framer-motion";



export default function Navbar() {
  const {toggle} = useSidebar();
 const [lastScrollY, setLastScrollY] = useState(0);
 const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const controllY = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setShowNav(true); // di paling atas selalu muncul
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNav(false); // scroll ke bawah >100px = sembunyi
            } else if (currentScrollY < lastScrollY) {
                setShowNav(true); // scroll ke atas = muncul
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controllY, { passive: true });
        return () => window.removeEventListener("scroll", controllY);
  } ,[lastScrollY])

  return (
    <motion.nav 
      animate={{ y: showNav ? 0 : -100 }} // pake framer biar halus
            transition={{ duration: 0.3, ease: "easeInOut" }}
        
      className="p-3 position-sticky top-0 start-0 w-100 bg-white shadow-sm" style={{zIndex: 2}}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">

          <Link href="/"
            className="btn btn-link text-secondary d-md-none p-0 border-0" 
            style={{fontSize: '28px', lineHeight: 1}}
            aria-label="kembali menu"
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
        
          <div className="text-primary fs-3 fw-bold text-center w-100">TYREXION</div>

          <button onClick={toggle}
            className="btn btn-link text-secondary d-md-none p-0 border-0" 
            style={{fontSize: '28px', lineHeight: 1}}
            aria-label="Toggle menu"
          >
            <i className="bi bi-layout-sidebar-inset"></i>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
