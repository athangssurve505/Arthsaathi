import Sidebar from "./Sections/Sidebar";
import { Outlet } from "react-router-dom";



export default function DashboardLayout() {

 
  return (
   <div className="flex min-h-screen">

      {/* Sidebar stays here */}
      <Sidebar/>

      {/* Only this area changes */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  )
}
