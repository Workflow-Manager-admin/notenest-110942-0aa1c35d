import React from "react";

type HeaderProps = {
  onSearch: (q: string) => void;
  user?: { name: string; email: string; avatar: string };
  onLogout: () => void;
  toggleSidebar: () => void;
};

export default function Header({ onSearch, user, onLogout, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 border-b bg-white shadow-sm">
      <button className="xl:hidden mr-2" onClick={toggleSidebar}>
        <span className="text-[28px]">&#9776;</span>
      </button>
      <h1 className="font-bold text-xl text-primary mr-2 flex-1">notenest</h1>
      <div className="flex-1 max-w-md">
        <input
          className="w-full border focus:outline-primary rounded-md px-3 py-2 bg-gray-50"
          placeholder="Search notes..."
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      {user && (
        <div className="flex items-center ml-4 gap-2">
          <span className="w-8 h-8 block relative rounded-full overflow-hidden">
            {/* Next.js Image optimization */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
          </span>
          <span className="text-xs">{user.name}</span>
          <button
            className="ml-2 px-3 py-1 hover:bg-gray-100 rounded text-xs text-gray-700"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
