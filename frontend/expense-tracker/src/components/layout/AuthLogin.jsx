import Card from '../../assets/images/Card.png'
import { LuTrendingUpDown } from "react-icons/lu";
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
                <div className='grid grid-cols-1 z-20'>
                    <SatusInfoCard 
                    icons={<LuTrendingUpDown/>}
                    value='₹10,000'
                    info="Track Your Income and Expense"
                    color='bg-primary'
                    />

                </div>
                <img src={Card} alt="loginImg" 
                    className='w-64 lg:w-[85%] absolute bottom-14 right-12 shadow-lg shadow-red-950'
                />
            </div>

        </div>
    )
}

const SatusInfoCard=(input)=>{
    return (
        <div className='flex gap-7 p-2 rounded-xl shadow-md bg-orange-100 shadow-orange-950 border border-gray-400 z-10'>
        <div className='h-16 w-16 flex items-center justify-center text-[46px] text-center  top-3 bg-orange-300 rounded-3xl drop-shadow-xl'>
            {input.icons}
        </div>
        <div >
            <h5 className='text-xl text-black mb-4 '>{input.info}</h5>
            <span className='text-[20px]  '>{input.value}</span>
        </div>
    </div>
    )
}