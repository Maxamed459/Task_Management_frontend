import { Task } from "@/types/types";

export default function Loading() {
    const Ammount: number[] = [1, 2, 3, 4];
    return ( 
        <div className="p-4 mt-8">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {Ammount.map((amm) => (
                  <div
                    key={amm}
                    className="bg-gray-200 border border-green-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-xl flex items-start gap-4 relative overflow-hidden"
                  >
                    {/* Main info */}
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold flex items-center p-2 bg-gray-300 rounded-md max-w-[90%]">
                        
                      </h2>
                      <p className="mt-1 text-gray-500 text-sm p-2 bg-gray-300 rounded-md max-w-[80%]"></p>
                      <span className="mt-3 block text-xs font-medium text-gray-400 p-2 bg-gray-300 max-w-25 rounded-md">
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    );
}