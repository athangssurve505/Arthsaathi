import axios from "axios";
import useAuthStore from "../store/auth.store";
import { refreshAccessToken } from "../services/auth.service";


const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
});

export const rotateApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get the latest access token from Zustand
    const accessToken = useAuthStore.getState().accessToken;

    // Attach Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Continue sending the request
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    console.log("Response Error:", error.response);

    // Only handle expired ACCESS tokens here
    if (
      error.response?.status === 401 &&
      error.response?.data?.errors?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      console.log("Access token expired");

      originalRequest._retry = true;

      try {
        console.log("Trying to rotate refresh token...");

        const response = await refreshAccessToken();

        console.log("Refresh successful");

        // Your response structure:
        // response.data.accessToken

        useAuthStore
          .getState()
          .setAccessToken(response.data.accessToken);

        // Retry the ORIGINAL request
        return api(originalRequest);

      } catch (refreshError) {
        console.log("Refresh token/session is invalid");

        useAuthStore
          .getState()
          .setSessionExpired(true);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;


// class Solution {
//     public long maximumSubarraySum(int[] nums, int k) {
//         int maxSum = 0;
//         int count = k;
//         int sum = 0;

//     HashMap<Integer , Integer> map = new HashMap<>();

//         for(int i = 0; i<nums.length; i++){
//             if(count == 0) {
//                 if(map.size()==k){
//                 maxSum = Math.max(maxSum,sum);
//                 sum-=nums[i-k];
                
//                 map.remove(nums[i-k]);
//                 }
//                 else {
//                 sum = 0;
//                  }
//                 map.remove(nums[i-k]);
//                 count = 1;
//             }

//             map.put(nums[i], map.getOrDefault(nums[i], 0) + 1); // put element in the map
//                 sum += nums[i];
//                 count--;
//         }
        
//         return maxSum;
//     }
// }