import { useRouter } from "next/navigation";

export default function DashCard({icon, title, text, subtext, location}: 
    {icon: React.ReactNode, title: string, text: string, subtext: string, location: string}) {
        const router = useRouter()
    return(
        <div className="p-2 border border-black/10 shadow-sm flex items-center justify-between w-full rounded-md cursor-pointer hover:scale-101 transition-shadow duration-300 hover:shadow-lg" onClick={() => {
            router.push(`${location}`)
        }}>
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