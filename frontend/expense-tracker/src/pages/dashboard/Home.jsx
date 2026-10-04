import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Cards/RecentTransactions";
import FinancialOverview from "../../components/Cards/FinancialOverview";
import Last30DaysExpenses from "../../components/Cards/Last30DaysExpenses";
import Last60DaysIncome from "../../components/Cards/Last60DaysIncome";
import { formatAmount } from "../../utils/helper";
import { LuCreditCard, LuWalletMinimal, LuHandCoins, LuRefreshCw } from "react-icons/lu";

export default function Home() {
    useUserAuth();
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLive, setIsLive] = useState(false);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD);
            if (response.data) {
                setDashboard(response.data);
                setIsLive(true);
            }
        } catch (err) {
            console.warn("Backend not reachable yet, using reference dashboard data:", err?.message);
            setIsLive(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Filter/map expense transactions for Row 3
    const expenseTransactions = useMemo(() => {
        if (dashboard?.last30daysExpense?.transactions?.length > 0) {
            return dashboard.last30daysExpense.transactions.map((t) => ({
                ...t,
                type: "Expense"
            }));
        }
        return (dashboard?.recentTransaction || [])
            .filter((t) => t.type === "Expense")
            .map((t) => ({ ...t, type: "Expense" }));
    }, [dashboard]);

    // Filter/map income transactions for Row 4
    const incomeTransactions = useMemo(() => {
        if (dashboard?.last60daysIncomeList?.transactions?.length > 0) {
            return dashboard.last60daysIncomeList.transactions.map((t) => ({
                ...t,
                type: "Income"
            }));
        }
        return (dashboard?.recentTransaction || [])
            .filter((t) => t.type === "Income")
            .map((t) => ({ ...t, type: "Income" }));
    }, [dashboard]);

    return (
        <DashBoardLayout activeMenu="Dashboard">
            <div className="space-y-6 max-w-6xl mx-auto pb-12">
                {/* Header title area */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#3D2617] tracking-tight">
                            Overview
                        </h1>
                        <p className="text-xs md:text-sm text-[#8C7D73] mt-1">
                            Track your financial health, balance, and recent activities.
                        </p>
                    </div>

                    <button
                        onClick={fetchDashboardData}
                        disabled={loading}
                        className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#5C3A21] bg-white border border-[#E8DFD5] hover:bg-[#F3EDE4] rounded-xl shadow-xs transition-colors disabled:opacity-50"
                    >
                        <LuRefreshCw className={`text-sm ${loading ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>

                {isLive && (
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Connected to live backend</span>
                    </div>
                )}

                {/* Row 1: 3 Metric Cards */}
                {loading && !dashboard ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 border border-[#EBE4DC] animate-pulse flex items-center gap-5"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#EBE4DC]" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-[#EBE4DC] rounded w-24" />
                                    <div className="h-8 bg-[#EBE4DC] rounded w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <InfoCard
                            icon={LuCreditCard}
                            label="Total Balance"
                            value={formatAmount(dashboard?.totalBalance ?? 0)}
                            color="bg-[#6366F1]"
                        />
                        <InfoCard
                            icon={LuWalletMinimal}
                            label="Total Income"
                            value={formatAmount(dashboard?.totalIncome ?? 0)}
                            color="bg-[#F97316]"
                        />
                        <InfoCard
                            icon={LuHandCoins}
                            label="Total Expense"
                            value={formatAmount(dashboard?.totalExpense ?? 0)}
                            color="bg-[#EF4444]"
                        />
                    </div>
                )}

                {/* Row 2: Recent Transactions (Left) + Financial Overview (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <RecentTransactions
                        title="Recent Transactions"
                        transactions={dashboard?.recentTransaction || []}
                        onSeeAll={() => navigate("/expense")}
                        emptyMessage="No recent transactions found."
                    />
                    <FinancialOverview
                        totalBalance={dashboard?.totalBalance ?? 0}
                        totalIncome={dashboard?.totalIncome ?? 0}
                        totalExpense={dashboard?.totalExpense ?? 0}
                    />
                </div>

                {/* Row 3: Expenses (Left) + Last 30 Days Expenses [Bar Chart] (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <RecentTransactions
                        title="Expenses"
                        transactions={expenseTransactions}
                        onSeeAll={() => navigate("/expense")}
                        emptyMessage="No recent expenses found."
                    />
                    <Last30DaysExpenses
                        transactions={dashboard?.last30daysExpense?.transactions || []}
                        total={dashboard?.last30daysExpense?.total ?? 0}
                    />
                </div>

                {/* Row 4: Last 60 Days Income [Pie Chart] (Left) + Income (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <Last60DaysIncome
                        transactions={dashboard?.last60daysIncomeList?.transactions || []}
                        total={
                            dashboard?.last60daysIncomeList?.total ??
                            (dashboard?.totalIncome ?? 0)
                        }
                    />
                    <RecentTransactions
                        title="Income"
                        transactions={incomeTransactions}
                        onSeeAll={() => navigate("/income")}
                        emptyMessage="No recent income found."
                    />
                </div>
            </div>
        </DashBoardLayout>
    );
}