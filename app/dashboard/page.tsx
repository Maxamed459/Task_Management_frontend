"use client"
import DashCard from "@/components/DashCard";
import { useAppSelector } from "@/state/store";
import { ListChecks } from "lucide-react";
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
    <div className="p-4">
      <div className="leading-1">
        <h1 className="text-2xl font-bold mb-4">Welcome, <span className="text-blue-600">{user?.full_name}!</span></h1>
        <p className="text-gray-600">This is your dashboard where you can manage your tasks efficiently.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <DashCard title={"Tasks"} text={"60"} subtext={"This is all tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"completed Tasks"} text={"10"} subtext={"All these tasks are completed"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"Today Tasks"} text={"3"} subtext={"this is today's tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard title={"Progress Tasks"} text={"5"} subtext={"All these tasks are in progress"} icon={<ListChecks className="text-blue-600" />} />
      </div>
    </div>
  );
}