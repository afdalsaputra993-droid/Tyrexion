"use client";

import { createContext, useContext, useState } from "react";

const sidebarContext = createContext()

export function SidebarProvider({children}) {
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(prev => !prev)
  
  return (
       <sidebarContext.Provider value={{isOpen, toggle}}>
         {children}
       </sidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(sidebarContext)
}