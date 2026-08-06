import { Route,Routes } from "react-router-dom"
import Auth from "../Pages/Auth/Auth"
import VerifyEmail from "../Pages/Auth/VerifyEmail"
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../Pages/Dashboard";

export default function AppRoutes() {
  return (
  <Routes>
  {/* Public Route */}
  <Route path="/auth" element={<Auth />} />
  <Route path="/verify-email" element={<VerifyEmail/>}/>

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    {/* <Route path="/profile" element={<Profile />} /> */}
  </Route>
</Routes>
  )
}
