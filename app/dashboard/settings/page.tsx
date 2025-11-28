import { Settings } from "lucide-react";

export default function SettingsPage() {
    return(
        <div className="w-full flex items-center justify-center h-screen">
            <div className="space-y-3 text-center">
                <h1 className="text-2xl font-semibold md:text-5xl">Welcome to the setting...</h1>
                <p className="text-sm md:text-xl text-gray-600">This feature is not available now we will add ASAB thanks for your patience</p>
                <Settings size={150} className="text-center mx-auto mt-15 animate-pulse" />
            </div>
        </div>
    );
}