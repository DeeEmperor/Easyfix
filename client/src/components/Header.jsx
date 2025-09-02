import React from "react";
import { User, Bell } from "lucide-react";

function Header() {
    return (
        <header className="flex justify-between items-center px-8 py-4 shadow-lg bg-gray-800">
            <div className="flex items-center gap-4">
                <img src="/image.png" alt="" className="h-10 w-10 " />
                <h1 className="text-2xl font-bold text-white">EazyFix</h1>
            </div>

            <div>
                <button className="h-8 w-8 text-white cursor-pointer hover:text-gray-400">
                    <Bell size={22}/>
                </button>

                <button className="h-8 w-8 text-white cursor-pointer hover:text-gray-400">
                    <User size={22}/>
                    
                </button>
      </div>
       </header>
    )
}

export default Header;