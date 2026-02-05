import axios from "axios"


/*
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
*/

const axiosInstance = axios.create({
baseUrl: import.meta.env.VITE_API_URL,
withCredential:true
})



export default axiosInstance