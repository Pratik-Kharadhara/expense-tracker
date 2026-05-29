import { useState } from "react";
import AuthLogin from "../../components/layout/AuthLogin";
import Input from "../../components/Input/Input";
import {Link } from "react-router-dom"
import {validateEmail} from "../../utils/helper"
import ProfilePhotoSelecter from "../../components/Input/ProfilePhotoSelecter";

export default function SignUp(){
    const [userName,setName] = useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState(null)
    const [image,setImage]= useState("");

    const handleSignUp=async (e)=>{
        e.preventDefault();
         
    if(!validateEmail(email)){
        setError("Enter a Valid Email!");
        return;
    }
    if(!password){
        setError("Enter a Valid Password");
        return;
    }
    if(!userName){
        setError("Enter a Valid User Name");
        return;
    }
    setError('')

    }
    return (
        <AuthLogin> 
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col center justify-center">
            <h3 className="text-xl font-semibold text-red-800 ">Join Us Today!</h3>
            <p className="text-xs font-bold mt-5px   mb-[5px]  text-amber-900">Enter the Details to Sign Up</p>

        <form onSubmit={handleSignUp}>
            <ProfilePhotoSelecter image={image} setImage={setImage} />
            
            
            <Input
            value={userName}
            label="User Name"
            placeholder="Enter Your Full Name"
            onChange={(e)=>setName(e.target.value)}
            type="text"
            />

         <Input 
                            value={email}
                            label="Email Address"
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder={'jhon@example.com'}
                            type="text"
                        />
        
                                 <Input 
                            value={password}
                            label="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder={'min 8 Charecters'}
                            type="password"
                        />
             {error && <p className="text-red-300 text-xs pb-2.5">{error}</p> }
                    <button type="submit" className="btn-primary">SignUp</button>

                            <p className="mt-4">Already have a Account?
                            <Link to="/login" className="font-medium text-red-600 underline"> Login</Link>
                
                            </p>
              

        </form>
            </div>
         </AuthLogin>
    )
}