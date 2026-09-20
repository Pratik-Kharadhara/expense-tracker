import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import  {HiOutlineX} from "react-icons/hi"
import SideMenu from "./SideMenu";


export default function Navbar({activeMenu}){
    const [openSideMenu,setOpenMenu] =useState();
    return(
        <div className="flex gap-5 bg-amber-900 border border-black backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            <button
            className="block lg:hidden text-black"
            onClick={()=>{
                setOpenMenu(!openSideMenu); //if click it will close the side menu 
            }}>
                {
                    openSideMenu ? <HiOutlineX className="text-2xl"/> 
                    : <MdOutlineMenu className="text-2xl"/>
                }
            </button>

            <h2 className="text-lg font-medium text-black"> Expense Tracker</h2>

            {openSideMenu &&
            <div className="fixed top-[61px] left-0 bg-white shadow-lg"> 
            <SideMenu activeMenu={activeMenu}/>
            </div>}
            
        </div>
    )
}