import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import ToastProvider from "./shared/Components/ToastProvider";
import api from "./api/axios";
import useAuthStore from "./store/auth.store";
import { getUser, refreshAccessToken } from "./services/auth.service";
import LoadingScreen from "./shared/Components/LoadingScreen";
import ConfirmationModal from "./shared/Components/ConfirmatioModal";
import {useNavigate} from "react-router-dom";

export default function App() {

const [isLoading, setisLoading] = useState(true);
const navigate = useNavigate();

 const showSessionExpired = useAuthStore(
    (state) => state.showSessionExpired

  );
console.log("showSessionExpired:", showSessionExpired);
useEffect(() => {
  async function initializeAuth() {
      try{
        
         // 1. Refresh token
         const tokenRes =await refreshAccessToken();

         // 2. Store access token
        useAuthStore.getState().setAccessToken(tokenRes.data.accessToken)

         // 3. Call /auth/me
         const userRes = await getUser();
        
          
         // 4. Store user
          useAuthStore.getState().setUser(userRes.data.user)
         
      }catch(err){
        useAuthStore
          .getState()
          .setSessionExpired(true);
        console.log(err.message)
      }

      finally{
         setisLoading(false);
      }
           

        }


 initializeAuth();
  
}, [])

  return(
    (isLoading ? 
      <LoadingScreen/>
    :
 <>
            <ToastProvider />

           <AppRoutes/>

           <ConfirmationModal isOpen={showSessionExpired}  
           title="Session Expired"
          description="For your security, your session has expired. Please log in again to continue using ArthSaathi."
          confirmText="Login"
           onConfirm={() => {
            useAuthStore.getState().logout();
           useAuthStore.getState().setSessionExpired(false);
           navigate("/auth");
  }}
        />
        </>
  ) )
}
