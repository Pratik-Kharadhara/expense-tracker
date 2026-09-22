import { useState } from "react";
import AuthLogin from "../../components/layout/AuthLogin";
import Input from "../../components/Input/Input";
import {Link } from "react-router-dom"
import {validateEmail} from "../../utils/helper"
import ProfilePhotoSelecter from "../../components/Input/ProfilePhotoSelecter";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
export default function SignUp(){
    const [fullname,setName] = useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState(null)
    const [image,setImage]= useState("");

    const navigate = useNavigate();
    const { updateUser} = useContext(UserContext);
    
    const handleSignUp=async (e)=>{
        e.preventDefault();
         let profileImageUrl = '';
    if(!validateEmail(email)){
        setError("Enter a Valid Email!");
        return;
    }
    if(!password){
        setError("Enter a Valid Password");
        return;
    }
    if(!fullname){
        setError("Enter a Valid User Name");
        return;
    }
    setError('')

    //api to signup

    try{
        //upload image if presnet
        if(image){
            const imgUploadRes = await uploadImage(image);
            profileImageUrl = imgUploadRes.imageUrl || "";
            
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP,{
            fullname,
            email,
            password,
            profileImageUrl
        });
        const {token,user}= response.data;
        if(token){
            localStorage.setItem("token",token);
            updateUser(user);
            navigate("/login")
        }
    }
    catch(error){
        if(error.response && error.response.data.message){
            setError(error.response.data.message)
        }
        else {
            setError("Something went Wrong Please try again later ")
        }
    }

    }
    return (
        <AuthLogin> 
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col center justify-center">
            <h3 className="text-xl font-semibold text-red-800 ">Join Us Today!</h3>
            <p className="text-xs font-bold mt-5px   mb-[5px]  text-amber-900">Enter the Details to Sign Up</p>

        <form onSubmit={handleSignUp}>
            <ProfilePhotoSelecter image={image} setImage={setImage} />
            
            
            <Input
            value={fullname}
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