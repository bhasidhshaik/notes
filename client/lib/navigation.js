import { LayoutDashboard, PlusCircle, Notebook, Trash2 } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Note",
    href: "/dashboard/create",
    icon: PlusCircle,
  },
  {
    title: "View Notes",
    href: "/dashboard/notes",
    icon: Notebook,
  },
  {
    title: "Recently Deleted",
    href: "/dashboard/deleted",
    icon: Trash2,
  },
];
