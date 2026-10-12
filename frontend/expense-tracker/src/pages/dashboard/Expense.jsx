import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseModal from "../../components/Expense/AddExpenseModal";
import toast from "react-hot-toast";

export default function Expense() {
    useUserAuth();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // API Call to Get All Expenses
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(API_PATHS.EXPENSE.FIND_ALLEXPENSE);
            if (res.data) {
                setExpenses(res.data);
            }
        } catch (err) {
            console.error("Failed to load expenses:", err);
            toast.error("Failed to load expense data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // API Call to Delete Expense
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            toast.success("Expense deleted successfully!");
            // Refresh list immediately
            fetchExpenses();
        } catch (err) {
            console.error("Failed to delete expense:", err);
            toast.error(err.response?.data?.message || "Failed to delete expense");
        }
    };

    // Downloading Expense Details as Excel file
    const handleDownloadExcel = async () => {
        setIsDownloading(true);
        try {
            const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXCELL, {
                responseType: "blob"
            });

            const blob = new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `expense_details_${new Date().toISOString().split("T")[0]}.xlsx`;
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
        <DashBoardLayout activeMenu="Expense">
            <div className="space-y-6 max-w-6xl mx-auto pb-12">
                {/* Expense Overview Section (Bar Chart + Add Expense button) */}
                <ExpenseOverview
                    expenses={expenses}
                    onAddExpense={() => setIsModalOpen(true)}
                />

                {/* Expense List Section (Table/List + Download Excel button) */}
                <ExpenseList
                    expenses={expenses}
                    onDelete={handleDelete}
                    onDownloadExcel={handleDownloadExcel}
                    isDownloading={isDownloading}
                />

                {/* Adding Expense (Form / Modal popup) */}
                <AddExpenseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchExpenses}
                />
            </div>
        </DashBoardLayout>
    );
}