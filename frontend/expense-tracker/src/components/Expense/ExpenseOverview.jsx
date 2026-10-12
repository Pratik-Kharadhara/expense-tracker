import React, { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import moment from "moment";
import { HiPlus } from "react-icons/hi";

export default function ExpenseOverview({ expenses = [], onAddExpense }) {
    // Group and aggregate expenses by date for the bar chart
    const chartData = useMemo(() => {
        if (!expenses || expenses.length === 0) return [];

        // Sort ascending by date
        const sorted = [...expenses].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        const grouped = {};
        sorted.forEach((item) => {
            const dateLabel = moment(item.date).format("D MMM");
            if (!grouped[dateLabel]) {
                grouped[dateLabel] = {
                    date: dateLabel,
                    amount: 0,
                    sources: []
                };
            }
            grouped[dateLabel].amount += Number(item.amount || 0);
            if (item.source && !grouped[dateLabel].sources.includes(item.source)) {
                grouped[dateLabel].sources.push(item.source);
            }
        });

        return Object.values(grouped);
    }, [expenses]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-[#3D2617] text-amber-50 text-xs px-3 py-2 rounded-lg shadow-lg border border-[#5C3A21]">
                    <p className="font-semibold text-amber-200">{label}</p>
                    <p className="text-white text-sm font-bold mt-0.5">
                        ${Number(data.value || 0).toLocaleString()}
                    </p>
                    {data.payload?.sources?.length > 0 && (
                        <p className="text-[11px] text-amber-100/70 mt-1">
                            {data.payload.sources.join(", ")}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#3D2617] tracking-tight">
                        Expense Overview
                    </h2>
                    <p className="text-xs md:text-sm text-[#8C7D73] mt-1">
                        Track your spending over time and analyze your expense trends.
                    </p>
                </div>

                <button
                    onClick={onAddExpense}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-[#FDF2F2] text-[#EF4444] hover:bg-[#FCE8E8] transition-colors cursor-pointer shadow-xs border border-[#FCDADA]"
                >
                    <HiPlus className="text-base" />
                    <span>Add Expense</span>
                </button>
            </div>

            {/* Chart Area */}
            {chartData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#F2ECE4] rounded-xl">
                    <span className="text-3xl mb-2">🏷️</span>
                    <p className="text-sm font-semibold text-[#3D2617]">No expenses recorded yet</p>
                    <p className="text-xs text-[#8C7D73] mt-1 max-w-sm">
                        Start tracking your spendings by clicking the "+ Add Expense" button above.
                    </p>
                </div>
            ) : (
                <div className="w-full h-72 md:h-80 my-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 15, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#F2ECE4"
                            />
                            <XAxis
                                dataKey="date"
                                stroke="#8C7D73"
                                fontSize={12}
                                tickLine={false}
                                axisLine={{ stroke: "#EBE4DC" }}
                            />
                            <YAxis
                                stroke="#8C7D73"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "#F5EFE6", opacity: 0.5 }}
                            />
                            <Bar
                                dataKey="amount"
                                fill="#EF4444"
                                radius={[10, 10, 0, 0]}
                                maxBarSize={64}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
