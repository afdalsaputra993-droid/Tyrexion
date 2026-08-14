"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";
import DesktopMenu from "@/components/DesktopMenu"
import ButtonNav from "@/components/ButtonNav"


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
        
      className="p-3 position-fixed top-0 start-0 w-100 bg-white shadow-sm" style={{zIndex: 2}}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
        
          <div className="text-primary fs-3 fw-bold text-start">TYREXION</div>

         <DesktopMenu />

          <ButtonNav />

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
