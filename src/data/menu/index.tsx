import type { ManagementType } from "@/_interfaces/collaborator.interfaces";
import { CircleQuestionMark, Coins, FileText, Gamepad2, LayoutDashboard, LineChart, type LucideIcon, PlayCircleIcon, PlayIcon, Settings } from "lucide-react"
import type { ReactNode } from "react";


interface SubMenuItem {
    name: string;
    path: string
    icon?: ReactNode;
}

interface SidebarItem {
    name: string
    path: string
    icon: LucideIcon
    child?: SubMenuItem[];
    badge?: string
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
]