import { Route,Routes } from "react-router-dom"
import Auth from "../Pages/Auth/Auth"

export default function AppRoutes() {
  return (
   <Routes>
    <Route path="/auth" element={<Auth/>}/>
   </Routes>
  )
}
