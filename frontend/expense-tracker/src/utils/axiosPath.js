import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    timeout:1000,
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (config)=>{
        return config;
    },
    (error)=>{
        if(error.resposne){
            if(error.response.status === 401){
                window.location.href = "/login"
            }else if(error.reponse.status === 500){
                console.error("Server Error Please try again later");
            }
            
        }else if(error.code === "ECONNABORTED"){
                console.error("Request Timout :Please try again later")
            }
            return  Promise.reject(error);
    }
);
export default axiosInstance;