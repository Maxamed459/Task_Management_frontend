import { ListChecks } from "lucide-react";

export default function DashCard({icon, title, text, subtext}: 
    {icon: React.ReactNode, title: string, text: string, subtext: string}) {
    return(
        <div className="p-4 border border-black/10 shadow-md flex items-center justify-between w-full rounded-md">
            <div className="">
                <p className="text-sm text-gray-600">{title}</p>
                <h4 className="text-2xl font-semibold">{text}</h4>
                <p className="text-sm text-gray-600">{subtext}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 ">
                {icon}
            </div>
        </div>
    );
}