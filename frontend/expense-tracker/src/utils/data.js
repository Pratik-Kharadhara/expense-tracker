import {
LuLayoutDashboard,
LuHandCoins,
LuWalletMinimal,
LuLogOut,
} from "react-icons/lu"

export const SIDE_MENU_DATA = [
    {
        id:"01",
        lable:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/home",

    },{
        id:"02",
        lable:"income",
        icon:LuWalletMinimal,
        path:"/income"
    },
    {
        id:"03",
        lable:"expense",
        icon:LuHandCoins,
        path:"/expense"
    },
    {
        id:"04",
        lable:"logout",
        icon:LuLogOut,
        path:"logout"
    }
]