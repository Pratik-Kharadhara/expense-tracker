import { useNavigate } from "react-router-dom";
import DashBoardLayout from "../../components/layout/DashBoardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
export default function Home(){
   useUserAuth();
   const navigate = useNavigate();
   const [dashboard , setDashboard]=  useState(null);
   const [loading , setLoading] = useState(false);

    const fetchDashboardData =async()=>{
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD);

            if(response.data){
                setDashboard(response.data);
            }
        }
        catch(e){
            console.error("something went wrong" ,e);
        }finally{
            setLoading(false);  
        }
    }

    // useEffect(()=>{
    //     fetchDashboardData();
      
    // },[]);
    
    return (
        <DashBoardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                home
                </div>  
        </DashBoardLayout>
    )
}