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

export default function Last30DaysExpenses({ transactions = [], total = 0 }) {
    // Process transactions into date-grouped bar chart data
    const chartData = useMemo(() => {
        if (!transactions || transactions.length === 0) {
            return [];
        }

        // Sort chronologically ascending
        const sorted = [...transactions].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Group by date (e.g., "01 Feb")
        const grouped = {};
        sorted.forEach((item) => {
            const dateLabel = moment(item.date).format("DD MMM");
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
    }, [transactions]);

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
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#EBE4DC] shadow-[0_4px_20px_rgba(60,40,20,0.03)] flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-[#3D2617]">
                        Last 30 Days Expenses
                    </h3>
                    {total > 0 && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FCE8E6] text-[#C5221F]">
                            Total: ${Number(total).toLocaleString()}
                        </span>
                    )}
                </div>

                {chartData.length === 0 ? (
                    <div className="h-64 md:h-72 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-[#8C7D73]">No expenses recorded in the last 30 days.</p>
                    </div>
                ) : (
                    <div className="w-full h-64 md:h-72 my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 15, left: -15, bottom: 5 }}
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
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F5EFE6", opacity: 0.5 }} />
                                <Bar
                                    dataKey="amount"
                                    fill="#875cf5"
                                    radius={[10, 10, 0, 0]}
                                    maxBarSize={64}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
