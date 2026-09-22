import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosPath";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = ()=>{
    const {user,updateUser , clearUser} = useContext(UserContext);
    const navigate = useNavigate();
useEffect(()=>{
     if(user) return;
    let isMounted = true;
    const fetchUserInfo= async()=>{
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.FOUND_USER)
            if(isMounted && response.data){
                updateUser(response.data);
            }
        }
        catch(error){
            console.error("Failed to fecth user info",error);
            if(isMounted){
                clearUser();
                navigate("/home")
            }
        }
    }
    fetchUserInfo();
    return ()=>{
        isMounted =false;
    }
},[updateUser,clearUser,navigate])
   
}