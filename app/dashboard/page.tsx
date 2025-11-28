"use client"
import DashCard from "@/components/DashCard";
import { useAppSelector } from "@/state/store";
import { ListChecks, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const {user} = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
      if (!user) {
        router.push("/auth/login");
      }
    }, [user, router]); 
  return (
    <div className="flex-1 w-full p-4 mt-8">
      <div className="leading-relaxed">
        <h1 className="text-xl md:text-2xl font-bold">Welcome, <span className="text-blue-600">{user?.full_name}!</span></h1>
        <p className="text-gray-600 text-xs md:text-[16px] leading-5">This is your dashboard where you can manage your tasks efficiently.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mx-auto gap-4 mt-4 md:mt-8">
        <DashCard title={"Tasks"} text={"60"} subtext={"This is all tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"completed Tasks"} text={"10"} subtext={"All these tasks are completed"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"Today Tasks"} text={"3"} subtext={"this is today's tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"Progress Tasks"} text={"5"} subtext={"All these tasks are in progress"} icon={<ListChecks className="text-blue-600" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border border-black/10 rounded-md p-4 space-y-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-200 rounded-md p-2">
              <ListChecks size={30} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-600">Completed Tasks</h2>
          </div>
          <div className="bg-blue-100 border border-blue-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-blue-800">
              <h4 className="text-xl font-semibold">completed tasks</h4>
              <p>Here the completed task</p>
            </div>
            <div className="bg-blue-400 rounded-full border border-blue-800 text-white w-1/4 text-center">
              completed
            </div>
          </div>
          <div className="bg-blue-100 border border-blue-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-blue-800">
              <h4 className="text-xl font-semibold">completed tasks</h4>
              <p>Here the completed task</p>
            </div>
            <div className="bg-blue-400 rounded-full border border-blue-800 text-white w-1/4 text-center">
              completed
            </div>
          </div>
          <div className="bg-blue-100 border border-blue-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-blue-800">
              <h4 className="text-xl font-semibold">completed tasks</h4>
              <p>Here the completed task</p>
            </div>
            <div className="bg-blue-400 rounded-full border border-blue-800 text-white w-1/4 text-center">
              completed
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 rounded-md p-4 space-y-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-red-200 rounded-md p-2">
              <Trash2 size={30} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-red-600">Completed Tasks</h2>
          </div>
          <div className="bg-red-100 border border-red-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-red-800">
              <h4 className="text-xl font-semibold">Deleted tasks</h4>
              <p>Here the deleted task</p>
            </div>
            <div className="bg-red-400 rounded-full border border-red-800 text-white w-1/4 text-center">
              deleted
            </div>
          </div>
          <div className="bg-red-100 border border-red-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-red-800">
              <h4 className="text-xl font-semibold">Deleted tasks</h4>
              <p>Here the deleted task</p>
            </div>
            <div className="bg-red-400 rounded-full border border-red-800 text-white w-1/4 text-center">
              deleted
            </div>
          </div>
          <div className="bg-red-100 border border-red-600 rounded-md p-4 flex items-center">
            <div className="w-3/4 text-red-800">
              <h4 className="text-xl font-semibold">Deleted tasks</h4>
              <p>Here the deleted task</p>
            </div>
            <div className="bg-red-400 rounded-full border border-red-800 text-white w-1/4 text-center">
              deleted
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}