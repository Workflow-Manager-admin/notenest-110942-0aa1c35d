import React from "react";

type SidebarProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ children, isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      {/* Sidebar background overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/20 transition-opacity xl:hidden ${
          isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
        aria-hidden
      ></div>
      <aside
        className={`fixed xl:static top-0 left-0 h-full z-50 w-[260px] bg-white border-r border-gray-100 shadow-xl xl:shadow-none transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
        `}
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">{children}</div>
      </aside>
    </>
  );
}
