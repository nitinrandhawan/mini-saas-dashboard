"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden p-4">
        <button onClick={() => setOpen(!open)}>
          <FaBars size={24} />
        </button>
      </div>

      <aside
        className={`fixed md:static top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link href="/leads" className="hover:bg-gray-700 p-2 rounded">
            Leads
          </Link>
        </nav>
      </aside>
    </>
  );
}
