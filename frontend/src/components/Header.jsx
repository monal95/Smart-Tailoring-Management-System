import React from "react";
import { Search, Bell, User } from "lucide-react";

const Header = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    return now.toLocaleDateString("en-US", options);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-8">
        {/* Current Date */}
        <span className="text-sm text-slate-600 font-medium hidden md:flex">
          {getCurrentDate()}
        </span>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
