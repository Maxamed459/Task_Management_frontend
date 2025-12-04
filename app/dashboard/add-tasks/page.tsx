 "use client"

import { useAppSelector } from "@/state/store";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddTasksPage() {
    const router = useRouter()
    const [taskData, setTAskData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        is_completed: "",
    });
    const {user, error, loading, access_token} = useAppSelector((state) => state.auth)
    const BACKEND_BASE_URL_TASKS = process.env.NEXT_PUBLIC_BACKEND_BASE_URL_TASKS;
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

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

    

    const createTask = async (data: typeof taskData) => {
        Swal.fire({
                    title: "Please wait...",
                    text: "Creating the task",
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    },
                  });
        try {
            const res = await axios.post(`${BACKEND_BASE_URL_TASKS}/`, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (res.status === 201) {
            Swal.fire({
                icon: "success",
                title: "Task created successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            router.push("/dashboard/tasks");
        }
        return res.data;

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Task creating error",
                showConfirmButton: false,
                timer: 1500,
            });
            throw(error)
        }
        
    };

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            setFieldErrors(null);
            setGeneralError(null);
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
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors(null);
        setGeneralError(null);
        mutation.mutate(taskData);
    };
    // if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Error fetching posts</h2>;
    return(
        <div className="p-4 mt-8 flex items-center justify-center h-sreen w-full">
            <div className="bg-white border border-black/10 shadow-md p-4 w-full max-w-[95%] mx-auto">
                <div className="leading-5 mb-4">
                    <h4 className="text-xl md:text-2xl font-semibold">Create task</h4>
                    <p className="text-gray-400">Enter the detail of the task below</p>
                </div>
                {generalError && <p className="text-red-600 p-2 border border-red-600 bg-red-200 rounded-md">{generalError}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={taskData.title} onChange={handleChange} placeholder="Enter the task title" name="title" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        {fieldErrors?.title && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.title.map((msg, idx) => (
                                    <p key={idx} className="text-red-600 text-sm">{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={taskData.description} onChange={handleChange} id="description" placeholder="Enter the task description" name="description" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        {fieldErrors?.description && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.description.map((msg, idx) => (
                                    <p key={idx} className="text-red-600 text-sm">{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="due_date">Due date</label>
                        <input type="date" value={taskData.due_date} onChange={handleChange} id="due_date" placeholder="Enter the task due_date" name="due_date" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                        {fieldErrors?.due_date && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.due_date.map((msg, idx) => (
                                    <p key={idx} className="text-red-600 text-sm">{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" onChange={(e) => handleSelectChange("priority", e)} className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option disabled defaultChecked  >Choose the task priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {fieldErrors?.priority && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.priority.map((msg, idx) => (
                                    <p key={idx} className="text-red-600 text-sm">{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="is_completed">Status</label>
                        <select id="is_completed" onChange={(e) => handleSelectChange("is_completed", e)}  className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option defaultChecked disabled >Choose the task status</option>
                            <option value="true">Completed</option>
                            <option value="false">on progress</option>
                        </select>
                        {fieldErrors?.is_completed && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.is_completed.map((msg, idx) => (
                                    <p key={idx} className="text-red-600 text-sm">{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button type="submit" disabled={mutation.status === "pending"} className="p-2 bg-linear-to-tr from-blue-600 to-purple-800 rounded-md text-white text-[16px] font-semibold">{mutation.status === "pending" ? "Adding..." : "Add task"}</button>
                </form>
            </div>
        </div>
    );
}