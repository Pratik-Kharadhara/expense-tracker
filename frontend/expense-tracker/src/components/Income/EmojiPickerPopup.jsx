import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerPopup({ icon = "💰", onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-xs font-semibold text-[#5C3A21] mb-1.5">
                EmojiPickerPopup
            </label>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 rounded-xl bg-[#F9F7F4] border border-[#E8DFD5] flex items-center justify-center text-2xl hover:bg-[#F3EDE4] transition-colors cursor-pointer shadow-xs focus:ring-2 focus:ring-[#875cf5]/30 focus:outline-none"
                    title="Click to pick an emoji"
                >
                    {icon || "💰"}
                </button>
                <span className="text-xs text-[#8C7D73]">
                    Click box to pick icon
                </span>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 left-0 shadow-2xl rounded-2xl overflow-hidden border border-[#E8DFD5] bg-white">
                    <EmojiPicker
                        onEmojiClick={(emojiData) => {
                            onSelect(emojiData.emoji);
                            setIsOpen(false);
                        }}
                        lazyLoadEmojis={true}
                    />
                </div>
            )}
        </div>
    );
}
