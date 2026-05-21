import { useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export default function Input(props){
   //showing password method 
   const [showPassword , setShowPassword]= useState(false);

   const togglePassWord = ()=>{
    setShowPassword(!showPassword); //whatever is showPassword currently it will toggle it
   }
   
   
    return (
        <div >  
            <label htmlFor="">{props.label}</label>
           
            <div className="input-box">
            <input 
            className="flex"
            type={ props.type == "password" ? showPassword ? 'text' : 'password' : props.type}  //If the input type is password, toggle between hidden ('password') and visible ('text'); otherwise use the given type normally
                //value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value}
                size={48}
                              

            />
            {
                props.type === "password" && 
                (
                    showPassword  ? 
                    <IoEye 
                    size={22}
                    className="text-Amber-950 cursor-pointer"
                    onClick={togglePassWord}
                    /> :
                    <IoEyeOff
                        size={22}
                        className=" text-slate-600 cursor-pointer"
                        onClick={togglePassWord}
                    />
                )
            }
            </div>
        </div>
    )
}