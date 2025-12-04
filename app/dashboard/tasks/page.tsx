"use client"
import Loading from "@/components/Loading";
import { useAppSelector } from "@/state/store";
import { Task } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircleCheckBig, } from "lucide-react";
import { useRouter } from "next/navigation";



export default function() {
  // const [tasks, setTasks] = useState<Task[]>([]);
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
    
    
    return(
      <div className="p-4 mt-8">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {data.map((task: Task) => (
          <div
          onClick={() => {
            router.push(`/dashboard/tasks/${task.id}`);
          }}
            key={task.id}
            className="bg-white border cursor-pointer border-green-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-xl flex items-start gap-4 relative overflow-hidden"
          >
            {/* Main info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-blue-700 flex items-center cursor-pointer" onClick={() => {
            router.push(`/dashboard/tasks/${task.id}`);
          }}>
                {task.title} <PriorityBadge priority={task.priority} />
              </h2>
              <p className="mt-1 text-gray-500 text-sm">{task.description}</p>
              <span className="mt-3 block text-xs font-medium text-gray-400">
                Due Date: <span className="text-purple-500 font-semibold">{task.due_date}</span>
              </span>
            </div>
            {/* Badge corner ribbon */}
            <div className="absolute top-20 md:top-4 right-4">
              <span className="bg-linear-to-tr from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow border border-green-200">
                {task.is_completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

export function PriorityBadge({ priority }: { priority: string }) {
    let color = "";
    switch(priority){
      case "high": color = "bg-red-100 text-red-600"; break;
      case "medium": color = "bg-yellow-100 text-yellow-600"; break;
      case "low": color = "bg-green-100 text-green-600"; break;
      default: color = "bg-gray-100 text-gray-600";
    }
    return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ml-2 ${color}`}>{priority}</span>;
  }