"use client"

import { useAppSelector } from "@/state/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { PriorityBadge } from "@/app/dashboard/tasks/page";
import { Task } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function TaskCards ({id, title, description, priority, due_date, is_completed}: {id: number, title:string, description: string, priority: string, due_date: string, is_completed: boolean}) {
    const router = useRouter()

    return (
                <div
                onClick={() => {
                  router.push(`/dashboard/tasks/${id}`);
                }}
                  key={id}
                  className="bg-linear-to-b from-gray-200 to-gray-50 border border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-md flex items-start gap-4 relative overflow-hidden"
                >
                  {/* Main info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-blue-700 flex items-center cursor-pointer" onClick={() => {
                  router.push(`/dashboard/tasks/${id}`);
                }}>
                      {title} <PriorityBadge priority={priority} />
                    </h2>
                    <p className="mt-1 text-gray-500 text-sm">{description}</p>
                    <span className="mt-3 block text-xs font-medium text-gray-400">
                      Due Date: <span className="text-purple-500 font-semibold">{due_date}</span>
                    </span>
                  </div>
                  {/* Badge corner ribbon */}
                  <div className="absolute top-20 md:top-4 right-4">
                    <span className="bg-linear-to-tr from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow border border-green-200">
                      {is_completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
    );
}