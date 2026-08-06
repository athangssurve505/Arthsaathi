import api from "../api/axios";

export  const registerUser = async (formData) =>{
    
    const response = await api.post("/auth/register",formData);
    console.log("Response:", response);
    return response.data;
 
}


export const loginUser = async (formData) =>{
   const response = await api.post("/auth/login",formData);
    return response.data;
}


export const verifyEmail = async (token) =>{
     if (!token) {
        throw new Error("Verification token not found.");
      }

      const response = await api.post("/auth/verify-email", {
        token,
      });

      return response;
}

export const refreshAccessToken = async () =>{
  const res = await api.get("/auth/rotateToken");

  return res.data
}

export const getUser = async () =>{
 const res = await api.get("/auth/me");

  return res.data
}
