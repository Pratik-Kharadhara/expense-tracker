import AuthLogin from "../../components/layout/AuthLogin";

export default function Login(){
    return (
        <AuthLogin>  
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col center justify-center">
                <h3 className="text-xl font-semibold text-red-800 ">Welcome Back!</h3>
                <p className="text-xs font-bold mt-5px   mb-[5px]  text-amber-900">Enter the Details to Log In</p>
            </div>
        </AuthLogin>
    )
}