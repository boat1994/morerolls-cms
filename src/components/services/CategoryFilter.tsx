"use client";

import { cn } from "@/lib/utils";

type CategoryFilterProps = {
    categories: { label: string; value: string }[];
    activeCategory: string;
    onSelect: (category: string) => void;
};

export function CategoryFilter({
    categories,
    activeCategory,
    onSelect,
}: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-6 mb-12 border-b border-neutral-100 pb-px overflow-x-auto no-scrollbar">
            {categories.map((category) => (
                <button
                    key={category.value}
                    onClick={() => onSelect(category.value)}
                    className={cn(
                        "text-sm uppercase tracking-widest pb-4 border-b-2 transition-all duration-300 whitespace-nowrap",
                        activeCategory === category.value
                            ? "border-black text-black font-bold"
                            : "border-transparent text-neutral-400 hover:text-black"
                    )}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
