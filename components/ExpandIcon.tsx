"use client"

import { ChevronFirst, ChevronLast, PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";

export default function ExpandIcon() {
  const { expanded, toggle } = useSidebar();

  return (
    <button
      className={`p-1.5 rounded-lg bg-gray-100 absolute m-4 ${
        expanded ? 'left-[290px] mt-2' : 'left-0 mt-2'
      }`}
      onClick={toggle}
    >
      {expanded ? <PanelLeft className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
    </button>
  );
}


