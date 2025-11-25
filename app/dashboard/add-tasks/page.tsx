export default function AddTasksPage() {
    return(
        <div className="p-4 mt-8 flex items-center justify-center h-sreen w-full">
            <div className="bg-white border border-black/10 shadow-md p-4 w-full max-w-[95%] mx-auto">
                <div className="leading-5 mb-4">
                    <h4 className="text-xl md:text-2xl font-semibold">Create task</h4>
                    <p className="text-gray-400">Enter the detail of the task below</p>
                </div>
                <form className="flex flex-col space-y-5">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Enter the task title" name="title" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" placeholder="Enter the task description" name="description" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="due_date">Due date</label>
                        <input type="date" id="due_date" placeholder="Enter the task due_date" name="due_date" className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="priority">Priority</label>
                        <select className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
                            <option defaultChecked disabled >Choose the task priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="is_completed">Status</label>
                        <select className="border border-blue-600/60 px-4 py-2 rounded-md outline-0 focus:outline-1 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-600/20 w-full">
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