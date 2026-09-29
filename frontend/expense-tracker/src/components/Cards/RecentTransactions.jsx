import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { formatDate } from "../../utils/helper";

export default function RecentTransactions({ transactions = [], onSeeAll }) {
    const getTransactionIcon = (item) => {
        // Use the icon stored in the database (emoji from emoji-picker)
        if (item.icon) {
            return <span className="text-xl leading-none">{item.icon}</span>;
        }

        // Fallback only if no icon is stored
        return item.type === "Income" ? (
            <LuTrendingUp className="text-lg text-[#137333]" />
        ) : (
            <LuTrendingDown className="text-lg text-[#C5221F]" />
        );
    };

    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-bold text-[#3D2617]">
                    Recent Transactions
                </h3>
                {onSeeAll && (
                    <button
                        onClick={onSeeAll}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E2D8CC] text-[#4A2E1B] bg-[#FDFBF7] hover:bg-[#F3EDE4] transition-colors"
                    >
                        <span>See All</span>
                        <HiOutlineArrowRight className="text-sm" />
                    </button>
                )}
            </div>

            {(!transactions || transactions.length === 0) ? (
                <div className="py-10 text-center">
                    <p className="text-sm text-[#8C7D73]">No recent transactions found.</p>
                </div>
            ) : (
                <div className="divide-y divide-[#F2ECE4]">
                    {transactions.slice(0, 5).map((item, index) => {
                        const isIncome = item.type === "Income";
                        const amount = Number(item.amount || 0).toLocaleString();

                        return (
                            <div key={item._id || index} className="py-3.5 flex items-center justify-between gap-3">
                                {/* Left: Icon + Source + Date */}
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-full bg-[#F5EFE6] flex items-center justify-center">
                                        {getTransactionIcon(item)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-[#3D2617] capitalize">
                                            {item.source || "Transaction"}
                                        </h4>
                                        <p className="text-xs text-[#8C7D73] mt-0.5">
                                            {formatDate(item.date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Amount badge */}
                                <span className={`text-sm font-semibold px-2.5 py-1 rounded-md ${
                                    isIncome
                                        ? "bg-[#E6F4EA] text-[#137333]"
                                        : "bg-[#FCE8E6] text-[#C5221F]"
                                }`}>
                                    {isIncome ? "+" : "-"} ${amount} {isIncome ? "↗" : "↘"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
