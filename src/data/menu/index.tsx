import type { ManagementType } from "@/_interfaces/collaborator.interfaces";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface SubMenuItem {
  name: string;
  path: string;
  icon?: ReactNode;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  child?: SubMenuItem[];
  badge?: string;
  expand?: boolean;
  role: ManagementType[];
}

export const MenuData: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    role: ["Admin"],
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
    role: ["Admin"],
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: Users,
    role: ["Admin"],
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: FileText,
    role: ["Admin"],
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    role: ["Admin"],
  },
];
