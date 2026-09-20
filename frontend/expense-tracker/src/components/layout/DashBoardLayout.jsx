import {React ,useContext} from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function DashBoardLayout({children,activeMenu }){
    const {user}= useContext(UserContext);
    return(
         <div className="">
            <Navbar activeMenu={activeMenu}/>
            {user &&(
                <div className="flex">
                    <div >
                    <SideMenu activeMenu={activeMenu}/>
                    </div>
               
                <div className="grow mx-5">{children}</div>
                 </div>
            )}
         </div>   
        )
}