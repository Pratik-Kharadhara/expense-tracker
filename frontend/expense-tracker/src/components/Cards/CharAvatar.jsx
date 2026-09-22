import React from "react";
import { getInitials } from "../../utils/helper";

export default function CharAvatar({fullName}){
    return(
        <div className="`${height || 'h-12'} &{width || 'w-12'} &{style || ''}flex items-center justify-center rounded-full text-gray-900">
            {getInitials(fullName)}
        </div>
    )
}