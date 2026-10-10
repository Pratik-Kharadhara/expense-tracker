import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import AddIncomeModal from "../../components/Income/AddIncomeModal";
import toast from "react-hot-toast";

export default function Income() {
    useUserAuth();

    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Fetch all incomes from backend
    const fetchIncomes = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.FIND_ALLINCOME);
            if (res.data) {
                setIncomes(res.data);
            }
        } catch (err) {
            console.error("Failed to load incomes:", err);
            toast.error("Failed to load income data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    // Delete an income entry
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this income?")) return;

        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            toast.success("Income deleted successfully!");
            // Refresh list immediately
            fetchIncomes();
        } catch (err) {
            console.error("Failed to delete income:", err);
            toast.error(err.response?.data?.message || "Failed to delete income");
        }
    };

    // Download Excel report
    const handleDownloadExcel = async () => {
        setIsDownloading(true);
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_EXCELL, {
                responseType: "blob"
            });

            const blob = new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `income_details_${new Date().toISOString().split("T")[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast.success("Excel report downloaded!");
        } catch (err) {
            console.error("Download failed:", err);
            toast.error("Failed to download Excel report");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <DashBoardLayout activeMenu="Income">
            <div className="space-y-6 max-w-6xl mx-auto pb-12">
                {/* Income Overview Bar Chart with Add Income action */}
                <IncomeOverview
                    incomes={incomes}
                    onAddIncome={() => setIsModalOpen(true)}
                />

                {/* Detailed Income Transactions List */}
                <IncomeList
                    incomes={incomes}
                    onDelete={handleDelete}
                    onDownloadExcel={handleDownloadExcel}
                    isDownloading={isDownloading}
                />

                {/* Add Income Modal */}
                <AddIncomeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchIncomes}
                />
            </div>
        </DashBoardLayout>
    );
}