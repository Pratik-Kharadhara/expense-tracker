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
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("token") || localStorage.getItem("Token");
            if (!token) {
                if (isMounted) navigate("/login");
                return;
            }

            const response = await axiosInstance.get(API_PATHS.AUTH.FOUND_USER);
            if (isMounted && response.data) {
                const userData = response.data.user || response.data;
                updateUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
        }
        catch(error){
            console.error("Failed to fetch user info", error);
            if(isMounted){
                if (error.response && error.response.status === 401) {
                    clearUser();
                    localStorage.removeItem("token");
                    localStorage.removeItem("Token");
                    localStorage.removeItem("user");
                    navigate("/login");
                } else {
                    // Try to restore user from localStorage if network fails
                    const savedUser = localStorage.getItem("user");
                    if (savedUser) {
                        try {
                            updateUser(JSON.parse(savedUser));
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        updateUser({ fullname: "Demo User", email: "user@example.com" });
                    }
                }
            }
        }
    }
    fetchUserInfo();
    return ()=>{
        isMounted =false;
    }
},[updateUser,clearUser,navigate])
   
}