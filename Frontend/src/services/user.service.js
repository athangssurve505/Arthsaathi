import api from "../api/axios";


export const changeUserPassword = async (data)=>{
    const response = await api.post("/user/change-password",data);
     console.log("Response:", response);
     return response.data;
 
}


export const getActiveSessions = async () =>{
    const response  = await api.get("/auth/sessions")
    console.log(response);
    return response.data
}