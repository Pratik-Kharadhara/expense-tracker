import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

export default function Navbar({ activeMenu }) {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex items-center justify-between bg-[#FDFBF7] border-b border-[#E8DFD5] px-4 md:px-8 py-3.5 sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-4">
                <button
                    className="block lg:hidden text-[#4A2E1B] hover:text-[#8B4513] p-1.5 rounded-lg hover:bg-[#F3EDE4] transition-colors"
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    aria-label="Toggle navigation menu"
                >
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <MdOutlineMenu className="text-2xl" />
                    )}
                </button>

                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#5C3A21] flex items-center justify-center text-amber-100 font-bold text-base shadow-xs">
                        ET
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-[#3D2617] tracking-tight">
                        Expense Tracker
                    </h2>
                </div>
            </div>

            {/* Mobile Sidebar overlay */}
            {openSideMenu && (
                <div 
                    className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 lg:hidden"
                    onClick={() => setOpenSideMenu(false)}
                >
                    <div 
                        className="fixed top-0 left-0 bottom-0 w-72 bg-[#FDFBF7] shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-left duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-[#E8DFD5] flex items-center justify-between">
                            <span className="font-bold text-[#4A2E1B]">Menu</span>
                            <button 
                                onClick={() => setOpenSideMenu(false)}
                                className="p-1 rounded-md hover:bg-[#F3EDE4] text-[#4A2E1B]"
                            >
                                <HiOutlineX className="text-xl" />
                            </button>
                        </div>
                        <SideMenu activeMenu={activeMenu} onSelect={() => setOpenSideMenu(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}