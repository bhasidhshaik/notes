"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        isActive
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
          : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  );
}
