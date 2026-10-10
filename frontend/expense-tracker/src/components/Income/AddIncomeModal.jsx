import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import EmojiPickerPopup from "./EmojiPickerPopup";
import axiosInstance from "../../utils/axiosPath";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";

export default function AddIncomeModal({ isOpen, onClose, onSuccess }) {
    const today = new Date().toISOString().split("T")[0];

    const [icon, setIcon] = useState("💰");
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!source.trim()) {
            toast.error("Please enter income source");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                icon: icon || "💰",
                source: source.trim(),
                amount: Number(amount),
                date
            });

            if (res.status === 200 || res.status === 201) {
                toast.success("Income added successfully!");
                // Reset form
                setSource("");
                setAmount("");
                setDate(today);
                setIcon("💰");
                onSuccess?.();
                onClose();
            }
        } catch (err) {
            console.error("Error adding income:", err);
            toast.error(err.response?.data?.message || "Failed to add income");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-2xl border border-[#EBE4DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2ECE4]">
                    <h3 className="text-lg font-bold text-[#3D2617]">Add Income</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-[#8C7D73] hover:text-[#3D2617] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <IoClose size={22} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Emoji selector */}
                    <EmojiPickerPopup
                        icon={icon}
                        onSelect={(newIcon) => setIcon(newIcon)}
                    />

                    {/* Income Source */}
                    <div>
                        <label className="block text-xs font-semibold text-[#5C3A21] mb-1.5">
                            Income Source
                        </label>
                        <input
                            type="text"
                            placeholder="Freelance, Salary, etc"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full bg-[#F9F7F4] border border-[#E8DFD5] rounded-xl px-4 py-2.5 text-sm text-[#3D2617] placeholder-[#A89A8E] outline-none focus:border-[#875cf5] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-semibold text-[#5C3A21] mb-1.5">
                            Amount
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 5000"
                            min="0"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-[#F9F7F4] border border-[#E8DFD5] rounded-xl px-4 py-2.5 text-sm text-[#3D2617] placeholder-[#A89A8E] outline-none focus:border-[#875cf5] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-xs font-semibold text-[#5C3A21] mb-1.5">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-[#F9F7F4] border border-[#E8DFD5] rounded-xl px-4 py-2.5 text-sm text-[#3D2617] outline-none focus:border-[#875cf5] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="pt-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-[#875cf5] hover:bg-[#7444ed] text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Adding..." : "Add Income"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
