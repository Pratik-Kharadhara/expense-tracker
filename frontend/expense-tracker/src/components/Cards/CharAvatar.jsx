import React from "react";
import { getInitials } from "../../utils/helper";

export default function CharAvatar({fullName, width = "w-12", height = "h-12", style = ""}){
    return(
        <div className={`${height} ${width} ${style} flex items-center justify-center rounded-full bg-amber-800 text-amber-50 font-semibold shadow-inner`}>
            {getInitials(fullName)}
        </div>
    )
}