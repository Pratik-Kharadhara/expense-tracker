import React from "react";
import { formatDate } from "../../utils/helper";
import { LuTrash2, LuDownload } from "react-icons/lu";

export default function ExpenseList({
    expenses = [],
    onDelete,
    onDownloadExcel,
    isDownloading = false
}) {
    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)]">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#3D2617]">
                        Expense Details
                    </h3>
                    <p className="text-xs text-[#8C7D73] mt-0.5">
                        {expenses.length} {expenses.length === 1 ? "entry" : "entries"} recorded
                    </p>
                </div>

                {expenses.length > 0 && onDownloadExcel && (
                    <button
                        onClick={onDownloadExcel}
                        disabled={isDownloading}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E2D8CC] text-[#4A2E1B] bg-[#FDFBF7] hover:bg-[#F3EDE4] transition-colors cursor-pointer disabled:opacity-50"
                        title="Download Excel report"
                    >
                        <LuDownload className="text-sm" />
                        <span>{isDownloading ? "Downloading..." : "Download Excel"}</span>
                    </button>
                )}
            </div>

            {expenses.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-sm text-[#8C7D73]">No expense transactions recorded yet.</p>
                </div>
            ) : (
                <div className="divide-y divide-[#F2ECE4]">
                    {expenses.map((item) => (
                        <div
                            key={item._id}
                            className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#FAF7F2]/60 px-2 rounded-xl transition-colors"
                        >
                            {/* Left: Icon + Source + Date */}
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-11 h-11 rounded-full bg-[#F5EFE6] flex items-center justify-center shrink-0 text-xl">
                                    {item.icon || "🛒"}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-sm text-[#3D2617] capitalize truncate">
                                        {item.source}
                                    </h4>
                                    <p className="text-xs text-[#8C7D73] mt-0.5">
                                        {formatDate(item.date)}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Amount badge + Delete button */}
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-sm font-semibold px-2.5 py-1 rounded-md bg-[#FCE8E6] text-[#C5221F]">
                                    - ${Number(item.amount || 0).toLocaleString()} ↘
                                </span>

                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="p-1.5 text-[#8C7D73] hover:text-[#C5221F] hover:bg-[#FCE8E6] rounded-lg transition-colors cursor-pointer"
                                        title="Delete transaction"
                                        aria-label="Delete expense"
                                    >
                                        <LuTrash2 className="text-base" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
