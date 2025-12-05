"use client"
import DashCard from "@/components/DashCard";
import Loading from "@/components/Loading";
import TaskCards from "@/components/TaskCards";
import { useAppSelector } from "@/state/store";
import { Task } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CopyPlus, ListChecks, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Dashboard() {
  const { user, access_token } = useAppSelector((state) => state.auth)
  const router = useRouter()

  const NEXT_PUBLIC_BACKEND_BASE_URL_TASKS = process.env.NEXT_PUBLIC_BACKEND_BASE_URL_TASKS;
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${NEXT_PUBLIC_BACKEND_BASE_URL_TASKS}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        return res.data
        
      } catch (error) {
        console.log(error)
      }
    }

    const {isPending, isError, data, error} = useQuery({
      queryKey: ['tasks'],
      queryFn: fetchTasks
    })

    if (isPending) {
      return <p>Loading</p>
    }

    if (isError) {
      return <p className="text-red-600 mt-8 p-4">Error: {error.message}</p>
    } 


    if (!user) {
      router.push("/auth/login");
    }

    const now = new Date().toISOString().split("T")[0]

  return (
    <div className="flex-1 w-full p-4 mt-8">
      <div className="leading-relaxed">
        <h1 className="text-xl md:text-2xl font-bold">Welcome, <span className="text-blue-600">{user?.full_name}!</span></h1>
        <p className="text-gray-600 text-xs md:text-[16px] leading-5">This is your dashboard where you can manage your tasks efficiently.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mx-auto gap-4 mt-4 md:mt-8">
        <DashCard location={"dashboard/tasks"} title={"Tasks"} text={"60"} subtext={"This is all tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard location={"dashboard/completed-tasks"} title={"completed Tasks"} text={"10"} subtext={"All these tasks are completed"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard location={"dashboard/tasks"} title={"Today Tasks"} text={"3"} subtext={"this is today's tasks"} icon={<ListChecks className="text-blue-600" />} />
        <DashCard location={"dashboard/tasks"} title={"Progress Tasks"} text={"5"} subtext={"All these tasks are in progress"} icon={<ListChecks className="text-blue-600" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex space-x-3 bg-linear-to-tr from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 hover:scale-101 hover:shadow-lg hover:shadow-purple-300 transition-colors duration-300 rounded-md items-center justify-center p-8" onClick={() => {
          router.push("dashboard/add-tasks")
        }}>
          <CopyPlus size={30} color="white" />
          <p className="text-xl text-white text-center">Create Task</p>
        </div>
        <div className="flex space-x-3 bg-linear-to-tr from-green-600 to-lime-600 hover:from-lime-600 hover:to-green-600 hover:scale-101 hover:shadow-lg hover:shadow-green-300 transition-colors duration-300 rounded-md items-center justify-center p-8" onClick={() => {
          router.push("dashboard/tasks")
        }}>
          <ListChecks size={30} color="white" />
          <p className="text-xl text-white text-center">Update Tasks</p>
        </div>
        <div className="flex space-x-3 bg-linear-to-tr from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 hover:scale-101 hover:shadow-lg hover:shadow-pink-300 transition-colors duration-300 rounded-md items-center justify-center p-8" onClick={() => {
          router.push("dashboard/tasks")
        }}>
          <Trash size={30} color="white" />
          <p className="text-xl text-white text-center">Delete Tasks</p>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 mt-6">
        <h2 className="text-sm sm:text-xl md:text-2xl font-semibold">Todays tasks</h2>
        {data.filter((task: Task) => task.due_date === now ).map((task: Task) => (
            <TaskCards key={task.id} id={task.id} title={task.title} description={task.description} priority={task.priority} due_date={task.due_date} is_completed={task.is_completed} />
        ))}
      </div>
      
    </div>
  );
}