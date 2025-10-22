"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
       router.replace("/auth/login");
    } catch (error) {
      toast.error(error || "failed to logout");
    }
  };
  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 text-gray-900 dark:text-white focus:outline-none "
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white w-64 p-4 transition-transform transform z-50
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-2xl font-bold">Mini SaaS Dashboard</h2>
          <button onClick={() => setOpen(false)} className="focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="md:block">
          <h2 className="hidden md:block text-2xl font-bold mb-6">
            Mini SaaS Dashboard
          </h2>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/leads"
              className="hover:bg-gray-700 p-2 rounded transition-colors"
              onClick={() => setOpen(false)} // close sidebar on mobile when clicked
            >
              Leads
            </Link>
            <button
              className="bg-gray-700 p-2 rounded hover:bg-red-500 transition-colors "
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
