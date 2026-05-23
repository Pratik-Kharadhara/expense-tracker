import { useState } from "react";
import AuthLogin from "../../components/layout/AuthLogin";
import Input from "../../components/Input/Input";
import {Link } from "react-router-dom"
import {validateEmail} from "../../utils/helper"




export default function Login(){
    const [email,setEmail]= useState();
    const [error,setError]=useState(null);
    const [password,setPassword]= useState()
   
      const handleLogin= async (e)=>{
            e.preventDefault();
    
    if(!validateEmail(email)){
        setError("Enter a Valid Email!");
        return;
    }
    if(!password){
        setError("Enter a Valid Password");
        return;
    }
    setError('')

    //api to login


    }
   
    return (
        <AuthLogin>  
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col center justify-center">
                <h3 className="text-xl font-semibold text-red-800 ">Welcome Back!</h3>
                <p className="text-xs font-bold mt-5px   mb-[5px]  text-amber-900">Enter the Details to Log In</p>
           
                <form   onSubmit={handleLogin}>
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
                {error && <p className="text-red-300 text-xs pb-2.5">{error}</p> }
                    <button type="submit" className="btn-primary">Login</button>
              
                <p className="mt-4">Don't have a Account?
                <Link to="/signup" className="font-medium text-red-600 underline">SignUP</Link>
                
                </p>
                </form>
                
            </div>
        </AuthLogin>
    )
}