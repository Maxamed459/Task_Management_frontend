"use client"

import Loading from "@/components/Loading";
import { useAppSelector } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlarmCheck, CircleCheckBig, ListChecks, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { Task } from "@/types/types";
import TaskCards from "@/components/TaskCards";
import { PriorityBadge } from "../tasks/page";

export default function CompletedTasksPage() {
  const { access_token } = useAppSelector((state) => state.auth);
    const NEXT_PUBLIC_BACKEND_BASE_URL_TASKS = process.env.NEXT_PUBLIC_BACKEND_BASE_URL_TASKS;
    const router = useRouter();
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
        return <Loading />
      }
  
      if (isError) {
        return <p className="text-red-600 mt-8 p-4">Error: {error.message}</p>
      }
  return (
    <div className="p-4 mt-8">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <CircleCheckBig className="text-green-500" size={28} /> Completed Tasks
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {data.filter((task: Task) => task.is_completed === true).length > 0 ? (
          <>
          {data?.filter((task: Task)  => task.is_completed === true).map((task:Task) => (
            <TaskCards key={task.id} id={task.id} title={task.title} description={task.description} priority={task.priority} due_date={task.due_date} is_completed={task.is_completed} />
          ))}
          </>
        ) : (
        <div className="col-span-2 mt-20 flex flex-col items-center gap-6">
          <p className="text-xl md:text-2xl text-gray-400 text-center">There is no completed tasks</p>
          <AlarmCheck size={40} color="gray" className="animate-bounce" />
        </div> 
        )
        }
      </div>
    </div>
  );
}