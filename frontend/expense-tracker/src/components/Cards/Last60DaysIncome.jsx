import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Last60DaysIncome({ transactions = [], total = 0 }) {
    const isZeroData = Number(total || 0) === 0 && transactions.length === 0;

    const chartData = useMemo(() => {
        if (isZeroData) {
            return [{ name: "No Income", value: 1, color: "#E8DFD5" }];
        }

        if (!transactions || transactions.length === 0) {
            return [{ name: "Total Income", value: Number(total), color: "#875cf5" }];
        }

        // Group by source (e.g. Salary, Freelance, etc.)
        const grouped = {};
        transactions.forEach((item) => {
            const src = item.source || "Income";
            grouped[src] = (grouped[src] || 0) + Number(item.amount || 0);
        });

        // Curated palette starting with reference purple
        const palette = [
            "#875cf5",
            "#A78BFA",
            "#F97316",
            "#10B981",
            "#6366F1",
            "#EC4899",
            "#F59E0B"
        ];

        return Object.keys(grouped).map((src, idx) => ({
            name: src,
            value: grouped[src],
            color: palette[idx % palette.length]
        }));
    }, [transactions, total, isZeroData]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            if (data.name === "No Income") return null;
            return (
                <div className="bg-[#3D2617] text-amber-50 text-xs px-3 py-1.5 rounded-lg shadow-lg border border-[#5C3A21]">
                    <p className="font-semibold text-amber-200">{data.name}</p>
                    <p className="text-white font-bold mt-0.5">
                        ${Number(data.value).toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)] flex flex-col justify-between h-full">
            <div>
                <h3 className="text-lg md:text-xl font-bold text-[#3D2617] mb-2">
                    Last 60 Days Income
                </h3>

                <div className="relative w-full h-64 md:h-72 flex items-center justify-center my-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={74}
                                outerRadius={106}
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

                    {/* Centered label matching Image 3 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <span className="text-xs md:text-sm font-medium text-[#7C6E65]">
                            Total Income
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-[#3D2617] tracking-tight mt-0.5">
                            ${Number(total || 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
