"use client";
import { useAppSelector } from "@/state/store";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/components/SidebarProvider";


export function Sidebar({ children }: { children: React.ReactNode }) {
    const { expanded } = useSidebar();
    const { user } = useAppSelector((state) => state.auth);
    const redirect = useRouter();
    return (
        <aside className={`h-screen ${
            expanded ? "w-75" : "w-0 hidden"
        }`}>
            <nav className="h-screen flex flex-col bg-white border-r border-r-black/10 shadow-sm">
                <div className="p-4 pb-2 flex items-center justify-between">
                    <Image
                        src="/task_logo.png"
                        width={120}
                        height={120}
                        alt="Tasky logo"
                        className={`overflow-hidden transition-all ${
                          expanded ? "w-32" : "w-0 hidden"
                        }`}
                    />
                </div>

                <ul className="flex-1 px-3">{children}</ul>

                <div className="border-t flex items-center p-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-center">
                        <p className="text-center text-xl text-white font-medium">
                            {user?.full_name.charAt(0).toUpperCase()}
                        </p>
                    </div>

                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${
                          expanded ? "w-55 mx-3" : "w-0"
                        }`}
                    >
                        <div className="leading-5">
                            <h4 className="font-semibold">{user?.full_name}</h4>
                            <span className="text-xs">{user?.email}</span>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("user");
                            localStorage.removeItem("access_token");
                            localStorage.removeItem("refresh_token");
                            redirect.push("/auth/login");
                        }}>
                            <button type="submit">
                                <LogOutIcon className="text-black" size={20} />
                            </button>
                    </form>
                    </div>
                </div>
            </nav>
        </aside>
    );
}


export function SidebarItem({
    icon,
    text,
    href,
}: {
    icon: React.ReactNode;
    text: string;
    href: string;
}) {
    const { expanded } = useSidebar();
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link href={href}>
            <li
                className={`
                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
                ${
                    isActive
                        ? "bg-linear-to-tr from-blue-600 to-purple-600 text-white"
                        : "hover:bg-blue-100 text-gray-600"
                }
            `}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-52 ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>
            </li>
        </Link>
    );
}

