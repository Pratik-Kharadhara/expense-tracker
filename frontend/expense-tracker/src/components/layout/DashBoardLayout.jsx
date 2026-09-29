import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function DashBoardLayout({ children, activeMenu }) {
    const { user } = useContext(UserContext);
    
    return (
        <div className="min-h-screen bg-[#FBF9F5] text-[#3D2617]">
            <Navbar activeMenu={activeMenu} />
            <div className="flex">
                <div className="hidden lg:block">
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full transition-all">
                    {children}
                </main>
            </div>
        </div>
    );
}