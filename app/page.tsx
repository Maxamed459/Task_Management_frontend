import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full max-w-[90%] mx-auto h-[80vh]">
      <div className="flex items-center justify-between">
        <div className="w-1/2 space-y-3">
        <div>
          <h1 className="text-5xl font-bold mb-3">
            Welcome to Tasky
          </h1>
          <p className="text-[16px] text-gray-500 tracking-wide">Here you can track your tasks and see whether task is done or pending or undone
            it`s built very robust backend using Django Rest Framework for building API's
          </p>
        </div>
          <div className="flex gap-4">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-800 rounded-lg text-white text-sm hover:bg-gradient-to-l hover:shadow-md hover:shadow-purple-800 duration-300 hover:scale-105">
                    <Link href="/auth/register w-full">Get Started</Link>
                </button>
            </div>
            <img src="/profiles.png" alt="" className="w-24 mt-2" />
        </div>
        <div className="w-1/2">
          <img src="/task.png" alt="task image" className="w-ful" />
        </div>
      </div>
    </div>
  );
}
