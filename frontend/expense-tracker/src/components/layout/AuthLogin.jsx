import Card from '../../assets/images/Card.png'
export default function AuthLogin({ children }){
    return ( 
        <div className='flex'>
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2>
                    Expense Tracker 
                </h2>
                {children}
                </div>
            <div className='hidden md:block w-[50vw] h-screen bg-orange-200 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className='w-48 h-56 bg-orange-300 absolute rounded-[40px] -top-7 left-0  '/>
                <div className='w-48 h-48 border-[20px] absolute border-amber-900 rounded-[10px] top-[40%] right-0'/>
                <div className='w-52 h-60 bg-orange-300 rounded-[40px] absolute -bottom-3 left-0'/>
              
                <img src={Card} alt="loginImg" 
                    className='w-64 lg:w-[85%] absolute bottom-14 right-12 shadow-lg shadow-red-950'
                />
            </div>

        </div>
    )
}