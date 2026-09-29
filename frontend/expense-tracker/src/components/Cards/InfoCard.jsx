import React from "react";

export default function InfoCard({
    icon: Icon,
    label,
    value,
    color = "bg-[#7C3AED]",
    iconColor = "text-white"
}) {
    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)] hover:shadow-[0_8px_24px_rgba(60,40,20,0.06)] transition-all flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm ${color} ${iconColor}`}>
                {Icon && <Icon className="text-2xl" />}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-[#7C6E65]">
                    {label}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#3D2617] tracking-tight mt-1 truncate">
                    {value}
                </h3>
            </div>
        </div>
    );
}
