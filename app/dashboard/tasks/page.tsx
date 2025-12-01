import { CircleCheckBig, ListChecks, Smile } from "lucide-react";

const demoTasks = [
    {
      id: 1,
      title: "Finish React Query Integration",
      description: "Successfully implemented mutation for adding tasks.",
      completedAt: "2025-11-20",
      icon: <CircleCheckBig className="text-green-600" size={32} />,    
      priority: "High",
    },
    {
      id: 2,
      title: "Design Dashboard Layout",
      description: "Modern sticky sidebar with responsive content.",
      completedAt: "2025-11-21",
      icon: <Smile className="text-blue-400" size={32} />,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Add Server Error Handling",
      description: "Shows error messages beautifully on forms.",
      completedAt: "2025-11-22",
      icon: <ListChecks className="text-purple-500" size={32} />,
      priority: "Low",
    },
    {
      id: 4,
      title: "Improve Task Card UI",
      description: "Task cards now look beautiful with badges and icons.",
      completedAt: "2025-11-23",
      icon: <CircleCheckBig className="text-green-400" size={32} />,
      priority: "High",
    },
  ];
export default function() {
    return(
        <div className="p-4 mt-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <CircleCheckBig className="text-green-500" size={28} /> Completed Tasks
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {demoTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-green-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-xl flex items-start gap-4 relative overflow-hidden"
          >
            {/* Icon/avatar */}
            <div className="rounded-full bg-gray-50 border border-gray-100 w-16 h-16 flex items-center justify-center shadow">
              {task.icon}
            </div>
            {/* Main info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-green-700 flex items-center">
                {task.title} <PriorityBadge priority={task.priority} />
              </h2>
              <p className="mt-1 text-gray-500 text-sm">{task.description}</p>
              <span className="mt-3 block text-xs font-medium text-gray-400">
                Completed: <span className="text-green-500 font-semibold">{task.completedAt}</span>
              </span>
            </div>
            {/* Badge corner ribbon */}
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium shadow border border-green-200">
                Done
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

function PriorityBadge({ priority }: { priority: string }) {
    let color = "";
    switch(priority){
      case "High": color = "bg-red-100 text-red-600"; break;
      case "Medium": color = "bg-yellow-100 text-yellow-600"; break;
      case "Low": color = "bg-green-100 text-green-600"; break;
      default: color = "bg-gray-100 text-gray-600";
    }
    return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ml-2 ${color}`}>{priority}</span>;
  }