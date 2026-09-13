import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { SidebarProvider } from "@/context/SidebarContext";


export default function Marketing({children}) {
  return (
  <SidebarProvider>
   <Navbar />
  <Sidebar />
    {children}
  </SidebarProvider>
    )
}