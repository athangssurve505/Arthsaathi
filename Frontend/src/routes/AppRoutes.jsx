import { Route,Routes } from "react-router-dom"
import Auth from "../Pages/Auth/Auth"
import VerifyEmail from "../Pages/Auth/VerifyEmail"
import ProtectedRoute from "./ProtectedRoutes";


import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Settings from "../Pages/Dashboard/Sections/Settings"
export default function AppRoutes() {
  return (
  <Routes>
  {/* Public Route */}
  <Route path="/auth" element={<Auth />} />
  <Route path="/verify-email" element={<VerifyEmail/>}/>

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<DashboardLayout />} >
    
          {/* Dashboard Home */}
          {/* <Route index element={<DashboardHome />} /> */}

          {/* Settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

    </Route>
   
  </Route>
</Routes>
  )
}
