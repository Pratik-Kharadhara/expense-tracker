import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

export default function SideMenu({ activeMenu, onSelect }) {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleClick = (route) => {
        onSelect?.();
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className="w-64 min-h-[calc(100vh-61px)] bg-[#FDFBF7] border-r border-[#E8DFD5] p-5 sticky top-[61px] z-20 flex flex-col justify-between">
            <div>
                <div className="flex flex-col items-center justify-center mt-5 mb-8 p-4 bg-[#F8F4EC] rounded-2xl border border-[#E8DFD5]/60 shadow-xs">
                    {user?.profileImageUrl ? (
                        <img 
                            src={user?.profileImageUrl}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#8B4513] shadow-xs"
                        />
                    ) : (
                        <div className="mb-3">
                            <CharAvatar
                                fullName={user?.fullName || user?.fullname || user?.name || "User"}
                                width="w-16"
                                height="h-16"
                                style="text-xl shadow-xs"
                            />
                        </div>
                    )}
                    <h5 className="font-semibold text-center text-[#3D2617] text-base truncate max-w-[190px]">
                        {user?.fullName || user?.fullname || user?.name || "User"}
                    </h5>
                    <p className="text-xs text-[#8C7D73] truncate max-w-[190px]">{user?.email || ""}</p>
                </div>

                <div className="space-y-1.5">
                    {SIDE_MENU_DATA.map((item, index) => {
                        const isActive = activeMenu?.toLowerCase() === item.lable.toLowerCase();
                        return (
                            <button
                                key={`menu_${index}`}
                                className={`w-full flex items-center gap-3.5 text-sm font-medium transition-all py-3 px-4 rounded-xl ${
                                    isActive
                                        ? "text-amber-50 bg-[#5C3A21] shadow-xs"
                                        : "text-[#5C4A3E] hover:bg-[#F3EDE4] hover:text-[#3D2617]"
                                }`}
                                onClick={() => handleClick(item.path)}
                            >
                                <item.icon className={`text-xl ${isActive ? "text-amber-200" : "text-[#8C7D73]"}`} />
                                <span className="capitalize">{item.lable}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            
            <div className="pt-4 border-t border-[#E8DFD5]/70 text-center">
                <span className="text-[11px] font-medium text-[#A89A8E] tracking-wider uppercase">
                    Expense Tracker
                </span>
            </div>
        </div>
    );
}