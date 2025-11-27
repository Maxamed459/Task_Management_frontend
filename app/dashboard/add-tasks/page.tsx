"use client"

import { useAppSelector } from "@/state/store";
import axios from "axios";
import { useState } from "react";

export default function AddTasksPage() {

    const [taskData, setTAskData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        is_completed: "",
    });
    const {user, error, loading, access_token} = useAppSelector((state) => state.auth)
    const BACKEND_BASE_URL_TASKS = process.env.BACKEND_BASE_URL_TASKS;

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

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await axios.post("http://localhost:8000/api/tasks/", taskData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        console.log(result.data);


    }
    // if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Error fetching posts</h2>;
    return(
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
                        <select id="priority" onChange={(e) => handleSelectChange("priority", e)} className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option disabled defaultChecked  >Choose the task priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="is_completed">Status</label>
                        <select id="is_completed" onChange={(e) => handleSelectChange("is_completed", e)}  className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option defaultChecked disabled >Choose the task status</option>
                            <option value="true">Completed</option>
                            <option value="false">on progress</option>
                        </select>
                    </div>
                    <button type="submit" className="p-2 bg-linear-to-tr from-blue-600 to-purple-800 rounded-md text-white text-[16px] font-semibold">Add task</button>
                </form>
            </div>
        </div>
    );
}