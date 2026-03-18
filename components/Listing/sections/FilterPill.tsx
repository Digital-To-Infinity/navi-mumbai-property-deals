"use client";

interface FilterPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
    return (
        <button
            onClick={onClick}
            className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold cursor-pointer border transition-all duration-250 whitespace-nowrap
                       ${active
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-white text-brand-paragraph border-brand-muted/40 hover:border-brand-primary/50 hover:text-brand-primary"
                }`}
        >
            {label}
        </button>
    );
}
