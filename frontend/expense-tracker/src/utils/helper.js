//all the helping functions will be here 

export const validateEmail=(email)=>{

    const regex = /^[^/s@]+@[^/s@]+\.[^/s@]+$/ ;

    return regex.test(email)

}