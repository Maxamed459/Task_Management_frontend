"use client";

import { useAppSelector } from "@/state/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function updateTaskPage() {
        const id = useParams().id as string;
        if (!id) {
            throw new Error("Task ID is required");
        }
        const router = useRouter();
    const [taskData, setTAskData] = useState({
            title: "",
            description: "",
            due_date: "",
            priority: "",
            is_completed: "",
        });
        const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
        const [generalError, setGeneralError] = useState<string | null>(null);
        const {user, error, loading, access_token} = useAppSelector((state) => state.auth)
        const BACKEND_BASE_URL_TASKS = process.env.NEXT_PUBLIC_BACKEND_BASE_URL_TASKS;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setTAskData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSelectChange = (
        field: "priority" | "is_completed",
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        setTAskData((prev) => ({ ...prev, [field]: value}));
    };

    const updateTask = async (data: typeof taskData) => {
        Swal.fire({
            title: "Please wait...",
            text: "updating the task",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
        try {
            const res = await axios.put(`${BACKEND_BASE_URL_TASKS}/${id}/`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Task updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/dashboard/tasks");
            }
            return res.data;
        } catch (error) {
            console.log("Error creating task:", error);
            throw error;
        }
    };
    const deleteTask = async (id: string) => {
        Swal.fire({
            title: "Please wait...",
            text: "deleting the task",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
        try {
            const res = await axios.delete(`${BACKEND_BASE_URL_TASKS}/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            if (res.status === 204) {
                Swal.fire({
                    icon: "success",
                    title: "Task deleted successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/dashboard/tasks");
            }
            return res.data;
        } catch (error) {
            console.log("Error creating task:", error);
            throw error;
        }
    };

    const { isPending, isError, data  } = useQuery({
        queryKey: ["task", id], 
        queryFn: async () => {
            const res = await axios.get(`${BACKEND_BASE_URL_TASKS}/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setTAskData({
                title: res.data.title,
                description: res.data.description,
                due_date: res.data.due_date,
                priority: res.data.priority,
                is_completed: res.data.is_completed,
            });
            return res.data;
        }
    })


    const updateMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            setTAskData({
                title: "",
                description: "",
                due_date: "",
                priority: "",
                is_completed: "",
            });
        },
        onError: (err) => {
            if (axios.isAxiosError(err) && err.response?.data) {
                const errData = err.response.data;
                if (typeof errData === "object") {
                    setFieldErrors(errData as Record<string, string[]>);
                    return;
                }
                if ((errData as any).message) {
                    setGeneralError((errData as any).message);
                    return;
                }
                setGeneralError(String(errData));
                return;
            }
            setGeneralError((err as Error).message);
        }
    }) 
    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            setTAskData({
                title: "",
                description: "",
                due_date: "",
                priority: "",
                is_completed: "",
            });
        },
        onError: (err) => {
            if (axios.isAxiosError(err) && err.response?.data) {
                const errData = err.response.data;
                if (typeof errData === "object") {
                    setFieldErrors(errData as Record<string, string[]>);
                    return;
                }
                if ((errData as any).message) {
                    setGeneralError((errData as any).message);
                    return;
                }
                setGeneralError(String(errData));
                return;
            }
            setGeneralError((err as Error).message);
        }
    }) 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors(null);
        setGeneralError(null);
        updateMutation.mutate(taskData);
    };
    const deleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors(null);
        setGeneralError(null);
        deleteMutation.mutate(id);
    };



    return (
        <div className="p-4 mt-8 flex items-center justify-center h-sreen w-full">
            <div className="bg-white border border-black/10 shadow-md p-4 w-full max-w-[95%] mx-auto">
                <div className="leading-5 mb-4">
                    <h4 className="text-xl md:text-2xl font-semibold">Create task</h4>
                    <p className="text-gray-400">Enter the detail of the task below</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={taskData.title} onChange={handleChange} placeholder="Enter the task title" name="title" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={taskData.description} onChange={handleChange} id="description" placeholder="Enter the task description" name="description" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="due_date">Due date</label>
                        <input type="date" value={taskData.due_date} onChange={handleChange} id="due_date" placeholder="Enter the task due_date" name="due_date" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="priority">Priority</label>
                        <select value={taskData.priority} id="priority" onChange={(e) => handleSelectChange("priority", e)} className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option disabled defaultChecked  >Choose the task priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="is_completed">Status</label>
                        <select value={taskData.is_completed} id="is_completed" onChange={(e) => handleSelectChange("is_completed", e)}  className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option defaultChecked disabled >Choose the task status</option>
                            <option value="true">Completed</option>
                            <option value="false">on progress</option>
                        </select>
                        
                    </div>
                    <button type="submit" className="p-2 bg-linear-to-tr from-blue-600 to-purple-800 rounded-md text-white text-[16px] font-semibold">{updateMutation.status === "pending" ? "Updating..." : "Update task"}</button>
                </form>
                <form onSubmit={deleteSubmit}>
                    <button type="submit" className="p-2 bg-linear-to-tr from-red-600 to-pink-800 rounded-md text-white w-full mt-4 text-[16px] font-semibold">{deleteMutation.status === "pending" ? "deleting..." : "Delete task"}</button>
                </form>
            </div>
        </div>
    )
}