import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MenuDrawer from "../components/MenuDrawer"
import { SidebarProvider } from "@/context/SidebarContext";


import Overview from "../components/Overview"


export default function DashboardUser({children}) {
  return (
    <SidebarProvider>
      <div className="d-flex" style={{ height: "calc(100vh - 56px)" }}>
        <Sidebar />
        <MenuDrawer />
        <main 
          className="flex-grow-1 bg-light overflow-x-hidden overflow-y-auto" 
          style={{ minWidth: 0 }}
        >
          <Navbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}