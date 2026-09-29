import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function FinancialOverview({
    totalBalance = 0,
    totalIncome = 0,
    totalExpense = 0
}) {
    // If total income and expense are both 0, display a subtle placeholder arc
    const isZeroData = (totalIncome === 0 && totalExpense === 0);

    const chartData = isZeroData
        ? [{ name: "No Data", value: 1, color: "#E8DFD5" }]
        : [
              {
                  name: "Total Balance",
                  value: Math.max(0, totalBalance),
                  color: "#6366F1" // Distinctive purple from screenshot
              },
              {
                  name: "Total Income",
                  value: totalIncome,
                  color: "#F97316" // Orange from screenshot
              },
              {
                  name: "Total Expense",
                  value: totalExpense,
                  color: "#EF4444" // Coral Red from screenshot
              }
          ].filter(item => item.value > 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            if (data.name === "No Data") return null;
            return (
                <div className="bg-[#3D2617] text-amber-50 text-xs px-3 py-1.5 rounded-lg shadow-lg">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-amber-200 mt-0.5">
                        ${Number(data.value).toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)] flex flex-col justify-between">
            <h3 className="text-lg md:text-xl font-bold text-[#3D2617] mb-2">
                Financial Overview
            </h3>

            <div className="relative w-full h-64 md:h-72 flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={72}
                            outerRadius={104}
                            paddingAngle={chartData.length > 1 ? 3 : 0}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        {!isZeroData && <Tooltip content={<CustomTooltip />} />}
                    </PieChart>
                </ResponsiveContainer>

                {/* Center text for Donut Chart */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-xs md:text-sm font-medium text-[#7C6E65]">
                        Total Balance
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-[#3D2617] tracking-tight mt-0.5">
                        ${Number(totalBalance || 0).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Legend / summary indicators */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F2ECE4] text-center text-xs">
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1.5 font-medium text-[#7C6E65]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                        Balance
                    </span>
                    <span className="font-semibold text-[#3D2617] mt-0.5">
                        ${Number(totalBalance).toLocaleString()}
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1.5 font-medium text-[#7C6E65]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                        Income
                    </span>
                    <span className="font-semibold text-[#3D2617] mt-0.5">
                        ${Number(totalIncome).toLocaleString()}
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1.5 font-medium text-[#7C6E65]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        Expense
                    </span>
                    <span className="font-semibold text-[#3D2617] mt-0.5">
                        ${Number(totalExpense).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
