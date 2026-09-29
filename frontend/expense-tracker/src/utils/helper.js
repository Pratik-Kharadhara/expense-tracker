//all the helping functions will be here 

export const validateEmail=(email)=>{

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    ;

    return regex.test(email)

}

export const getInitials=(name)=>{
    if(!name) return "";

    const words = name.split(" ");
    let initals = "";
    for(let i =0;i<Math.min(words.length,2);i++){
        initals += words[i][0];
    }

    return initals.toUpperCase();
}

export const formatAmount = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "$0";
    return "$" + Number(num).toLocaleString();
};

export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Suffix for day (1st, 2nd, 3rd, 4th, etc.)
    const getDaySuffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
};