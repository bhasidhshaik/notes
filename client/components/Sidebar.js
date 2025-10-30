"use client";

import { useState, useEffect, useRef } from "react";
import { sidebarItems } from "@/lib/navigation";
import SidebarItem from "./SidebarItem";
import { Separator } from "@/components/ui/separator";
import { Menu, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const {logout , user} = useAuth()

  // ✅ Detect mobile layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto-close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [pathname, isMobile]);

  // ✅ Fetch user (/me)
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   const fetchUser = async () => {
  //     try {
  //       const res = await api.get(`/users/me`);
  //       if (res.data?.success) setUser(res.data.user);
  //     } catch (err) {
  //       console.error("Fetch user error:", err);
  //       localStorage.removeItem("token");
  //       router.push("/login");
  //     }
  //   };

  //   fetchUser();
  // }, [router]);

  // ✅ Handle logout
 const handleLogout = () => {
 logout()
  toast.success("Logged out successfully");
  router.push("/login");
};


  // ✅ Handle click outside profile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileNaviagte = () => {
    router.push("/dashboard/profile");
  };


  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white/70 backdrop-blur-md border rounded-md shadow"
        >
          <Menu className="h-5 w-5 text-gray-800" />
        </button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between">
          <div>
            <div className="p-4 text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Primetrade
            </div>
            <Separator className="mb-4" />
            <nav className="flex flex-col gap-1 px-3">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.href} item={item} />
              ))}
            </nav>
          </div>

          {/* Profile Section */}
          <div className="relative px-3 pb-6" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 w-full transition"
            >
              <img
                src={
                  user?.profile ||
                  "https://avatar.iran.liara.run/public/boy?username=default"
                }
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border"
              />
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-gray-800 truncate w-32">
                  {user?.name || "Loading..."}
                </span>
                <span className="text-xs text-gray-500 truncate w-32">
                  {user?.email || ""}
                </span>
              </div>
            </button>

            {/* Profile Menu */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-20 left-3 w-56 bg-white border rounded-lg shadow-xl p-3"
                >
                  <p className="text-sm text-gray-800 font-medium mb-1 cursor-pointer" onClick={handleProfileNaviagte} >
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2 cursor-pointer" onClick={handleProfileNaviagte} >{user?.email}</p>
                  <Separator className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 w-full px-2 py-1.5 rounded-md transition"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-white border-r flex flex-col justify-between z-50 shadow-xl"
            >
              <div>
                <div className="p-4 text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Primetrade
                </div>
                <Separator className="mb-4" />
                <nav className="flex flex-col gap-1 px-3">
                  {sidebarItems.map((item) => (
                    <SidebarItem key={item.href} item={item} />
                  ))}
                </nav>
              </div>

              {/* Mobile Profile Section */}
              <div className="px-3 pb-6 border-t pt-3">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      user?.profile ||
                      "https://avatar.iran.liara.run/public/boy?username=default"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 w-full px-2 py-1.5 rounded-md transition"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
