import React from "react";
import { Search } from "lucide-react";

function SearchBar({placeholder, onSearch}) {
    return (
        <div className="flex justify-center px-8 py-6 bg-gray-800">
            <div className="relative w-full max-w-2xl">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <input 
                    type="text" 
                    placeholder={placeholder || "Search for a service here"} 
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none focus:border-amber-500"
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && onSearch) onSearch(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default SearchBar;