"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { searchProjects, getProjectTypes } from "@/app/actions/search";
import type { Project } from "@/payload-types";
// import { useDebounce } from "@/lib/hooks/useDebounce"

// Simple debounce hook if not existing
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Project[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedQuery = useDebounceValue(query, 500);

    useEffect(() => {
        if (isOpen) {
            // Fetch suggestions (project types) when opened
            getProjectTypes().then(setSuggestions);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const docs = await searchProjects(debouncedQuery);
                setResults(docs);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    const handleClose = () => {
        setIsOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 transition-colors duration-200 hover:text-neutral-600"
                aria-label="Search"
            >
                <SearchIcon className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 h-20">
                             <div className="flex-1 max-w-2xl mx-auto flex items-center gap-4">
                                <SearchIcon className="w-5 h-5 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search projects by name..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 text-lg outline-none placeholder:text-gray-300 text-black caret-black"
                                />
                             </div>
                            <button
                                onClick={handleClose}
                                className="p-2 -mr-2 text-gray-400 hover:text-black transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="max-w-2xl mx-auto space-y-8">
                                {/* Results */}
                                {query ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                {isLoading ? "Searching..." : `Results (${results.length})`}
                                            </h3>
                                            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-black" />}
                                        </div>
                                        
                                        {isLoading ? (
                                             <div className="flex justify-center py-12">
                                                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                                             </div>
                                        ) : (
                                            <div className="grid gap-2">
                                                {results.map((project) => (
                                                    <Link
                                                        key={project.id}
                                                        href={`/projects/${project.slug}`}
                                                        onClick={handleClose}
                                                        className="block p-4 -mx-4 hover:bg-gray-50 rounded-xl transition-colors group"
                                                    >
                                                        <span className="text-lg font-medium text-black group-hover:text-black transition-colors">
                                                            {project.title}
                                                        </span>
                                                        {project.services && (
                                                            <span className="block text-sm text-gray-400 mt-1">
                                                                {project.services}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                                {results.length === 0 && (
                                                    <p className="text-gray-400">No projects found.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Suggestions / Categories */
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            Suggestions by Type
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestions.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setQuery(type)}
                                                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all text-sm font-medium"
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                             {suggestions.length === 0 && (
                                                <p className="text-gray-400 text-sm">No suggestions available.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
