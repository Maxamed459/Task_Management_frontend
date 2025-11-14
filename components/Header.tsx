import Link from "next/link";

export default function Header () {
    return(

        <div className="text-center w-full max-w-[90%] mx-auto flex items-center justify-between py-4">
            <Link href="/">
                <h1 className="text-2xl font-bold">Tasky</h1>
            </Link>
            
            <nav>
                <ul className="flex items-center gap-6">
                    <li><Link href="#">About</Link></li>
                    <li><Link href="#">Features</Link></li>
                    <li><Link href="#">Pricing</Link></li>
                    <li><Link href="#">Contacts</Link></li>
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-800 rounded-lg text-white text-sm hover:bg-gradient-to-l hover:shadow-md hover:shadow-purple-800 duration-300 hover:scale-105">
                    <Link href="/auth/login">Login</Link>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-800 rounded-lg text-white text-sm hover:bg-gradient-to-l hover:shadow-md hover:shadow-purple-800 duration-300 hover:scale-105">
                    <Link href="/auth/register">Get Started</Link>
                </button>
            </div>
        </div>

    );
}