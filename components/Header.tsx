"use client"
import { useAppSelector } from "@/state/store";
import Link from "next/link";

export default function Header () {
    const {user} = useAppSelector((state) => state.auth)
    console.log("Hereis the user; ",user)
    return(

        <div className="text-center w-full max-w-[90%] mx-auto flex items-center justify-between py-4">
            <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600">T<span className="text-slate-800">asky</span></h1>
            </Link>
            
            <nav>
                <ul className="flex items-center gap-8">
                    {user ? (
                        <>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                            <li><Link href="#">My Tasks</Link></li>
                            <li><Link href="#">Completed Tasks</Link></li>
                            <li>
                                <button className="px-4 py-2 bg-linear-to-r from-pink-700 to-red-800 rounded-lg text-white text-sm hover:bg-linear-to-l hover:shadow-md hover:shadow-pink-800 duration-300 hover:scale-105">
                            <Link href="#">Logout</Link>
                    </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link href="#">About</Link></li>
                            <li><Link href="#">Features</Link></li>
                            <li><Link href="#">Pricing</Link></li>
                            <li><Link href="#">Contacts</Link></li>
                        </>
                    )}
                    
                </ul>
            </nav>
            {!user && (
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-800 rounded-lg text-white text-sm hover:bg-linear-to-l hover:shadow-md hover:shadow-purple-800 duration-300 hover:scale-105">
                        <Link href="/auth/login">Login</Link>
                    </button>
                    <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-800 rounded-lg text-white text-sm hover:bg-linear-to-l hover:shadow-md hover:shadow-purple-800 duration-300 hover:scale-105">
                        <Link href="/auth/register">Get Started</Link>
                    </button>
                </div>
            )}
        </div>

    );
}