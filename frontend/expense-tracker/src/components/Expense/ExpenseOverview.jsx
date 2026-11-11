import React, { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Rectangle
} from "recharts";
import moment from "moment";
import { HiPlus } from "react-icons/hi";

// Custom Active Bar with fixed indicator dot, leader line, and attached callout box
const CustomActiveBar = (props) => {
    const {
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        payload,
        value = 0,
        index = 0,
        totalBars = 1,
        parentViewBox
    } = props;

    if (width <= 0) return null;

    const barHeight = Math.max(0, height);
    const barY = y;
    const barX = x;

    // Fixed point dot centered horizontally on the bar, placed in the upper portion
    const dotX = barX + width / 2;
    const dotY = barHeight > 50
        ? barY + Math.min(28, barHeight * 0.3)
        : barY + Math.max(12, barHeight / 2);

    const dateLabel = payload?.date || payload?.label || "";
    const amountVal = Number(value || payload?.amount || 0);
    const amountText = `$${amountVal.toLocaleString()}`;
    const sources = payload?.sources || [];
    const sourcesText = sources.length > 0 ? sources.join(", ") : "";
    const displaySources = sourcesText.length > 22 ? sourcesText.slice(0, 20) + "…" : sourcesText;
    const hasSources = Boolean(displaySources);

    // Dynamic box width based on text length
    const boxWidth = Math.max(
        110,
        Math.min(160, Math.max(amountText.length * 9 + 28, displaySources.length * 7 + 24))
    );
    const boxHeight = hasSources ? 62 : 46;

    // Direction: point left if near right edge or on the last bar
    const chartWidth = parentViewBox?.width || 500;
    const isRight = (index < totalBars - 1) && (dotX + boxWidth + 45 <= chartWidth);

    // Callout elbow geometry matching reference sketch
    const deltaX = 22;
    const deltaY = 20;
    const elbowX = isRight ? dotX + deltaX : dotX - deltaX;

    let elbowY = dotY - deltaY;
    if (elbowY < boxHeight / 2 + 10) {
        elbowY = Math.max(boxHeight / 2 + 10, dotY + deltaY);
    }

    const endX = isRight ? elbowX + 18 : elbowX - 18;
    const boxX = isRight ? endX : endX - boxWidth;
    const boxY = elbowY - boxHeight / 2;

    const pathD = `M ${dotX} ${dotY} L ${elbowX} ${elbowY} L ${endX} ${elbowY}`;

    return (
        <g className="custom-active-bar pointer-events-none">
            {/* The Bar */}
            <Rectangle
                {...props}
                radius={[10, 10, 0, 0]}
            />

            {/* Leader line connecting dot to callout box */}
            <path
                d={pathD}
                fill="none"
                stroke="#3D2617"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Target indicator dot on the bar */}
            <circle
                cx={dotX}
                cy={dotY}
                r={5}
                fill="#3D2617"
                stroke="#FFFFFF"
                strokeWidth={2}
            />

            {/* Tooltip Box attached to line */}
            <g transform={`translate(${boxX}, ${boxY})`}>
                <rect
                    x={0}
                    y={0}
                    width={boxWidth}
                    height={boxHeight}
                    rx={8}
                    ry={8}
                    fill="#3D2617"
                    stroke="#5C3A21"
                    strokeWidth={1}
                    filter="url(#expense-bar-tooltip-shadow)"
                />

                <text
                    x={12}
                    y={16}
                    fill="#FDE68A"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="inherit"
                >
                    {dateLabel}
                </text>

                <text
                    x={12}
                    y={hasSources ? 36 : 34}
                    fill="#FFFFFF"
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="inherit"
                >
                    {amountText}
                </text>

                {hasSources && (
                    <text
                        x={12}
                        y={52}
                        fill="rgba(254, 243, 199, 0.75)"
                        fontSize="10"
                        fontFamily="inherit"
                    >
                        {displaySources}
                    </text>
                )}
            </g>
        </g>
    );
};

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
                <div className="w-full h-72 md:h-80 my-2 overflow-visible">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 35, right: 15, left: -10, bottom: 5 }}
                            style={{ overflow: "visible" }}
                        >
                            <defs>
                                <filter id="expense-bar-tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3D2617" floodOpacity="0.25" />
                                </filter>
                            </defs>
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
                                cursor={false}
                                content={() => null}
                                isAnimationActive={false}
                            />
                            <Bar
                                dataKey="amount"
                                fill="#EF4444"
                                radius={[10, 10, 0, 0]}
                                maxBarSize={64}
                                activeBar={(props) => (
                                    <CustomActiveBar {...props} totalBars={chartData.length} />
                                )}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
