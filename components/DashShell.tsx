// app/dashboard/DashboardShell.tsx  (client component)
"use client";

import {Sidebar, SidebarItem} from "../components/Sidebar";
import { CircleCheckBig, CopyPlus, HelpCircle, Home, ListChecks, Settings } from "lucide-react";
import ExpandIcon from "./ExpandIcon";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full flex h-screen">
        <Sidebar>
            <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
            <SidebarItem icon={<CopyPlus size={20} />} text="Add Task" href="/dashboard/add-tasks" />
            <SidebarItem icon={<ListChecks size={20} />} text="My Tasks" href="/dashboard/tasks" />
            <SidebarItem icon={<CircleCheckBig size={20} />} text="Completed Tasks" href="/dashboard/completed-tasks" />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" href="/dashboard/settings" />
            <SidebarItem icon={<HelpCircle size={20} />} text="Help" href="/dashboard/help" />
        </Sidebar>
        <ExpandIcon />
        <div className="flex-1 bg-slate-50 overflow-auto">{children}</div>
    </div>
  );
}