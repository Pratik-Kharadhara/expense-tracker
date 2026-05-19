import { useState } from "react";
import AuthLogin from "../../components/layout/AuthLogin";
import Input from "../../components/Input/Input";

export default function Login(){
    const [email,setEmail]= useState();
    const handleLogin= async (e)=>{
            e.preventDefault();
            console.log(e.target)
    }

    const [password,setPassword]= useState()
   
   
    return (
        <AuthLogin>  
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col center justify-center">
                <h3 className="text-xl font-semibold text-red-800 ">Welcome Back!</h3>
                <p className="text-xs font-bold mt-5px   mb-[5px]  text-amber-900">Enter the Details to Log In</p>
           
                <form onSubmit={handleLogin}>
                        <Input 
                    value={email}
                    label="Email Address"
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder={'jhon@example.com'}
                    type="text"
                />

                         <Input 
                    value={password}
                    label="Pass Word"
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder={'min 8 Charecters'}
                    type="password"
                />
                </form>
                
            </div>
        </AuthLogin>
    )
}