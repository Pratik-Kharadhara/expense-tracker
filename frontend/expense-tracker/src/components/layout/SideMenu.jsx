import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SideMenu({activeMenu}){
    const {user , clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleClick=(route)=>{
        if(route==="logout"){
            handleLogout();
            return;
        }

        navigate(route);
    }
    const handleLogout=()=>{
        localStorage.clear();
        clearUser();
        navigate("/login");
    }

    return(
        <div className="w-64 min-h-[calc(100vh-61px)] bg-white border-r border-amber-600 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center mt-7 mb-6">
                {!user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl || ""}
                     alt="Profile Image"
                     className="w-16 h-16 rounded-full object-cover mb-3"
                     /> ): <CharAvatar
                     fullName={fullName}
                     width="w-20"
                     height="h-20"
                     style="text-xl"/>
                }
                <h5 className="font-medium text-center">
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item,index)=>{
                return (
                    <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] ${
                     activeMenu?.toLowerCase() === item.lable.toLowerCase() ? "text-white bg-orange-800" : "text-slate-700 hover:bg-orange-100"} py-3 px-4 rounded-lg mb-3`}
                    onClick={()=>handleClick(item.path)}
                    >
                        <item.icon className="text-lg"/>
                        <span className="capitalize">{item.lable}</span>
                    </button>
                );
            })

            }
        </div>
    )
}