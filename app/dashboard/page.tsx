"use client"
import { useAppSelector } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const {user} = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
      if (!user) {
        router.push("/auth/login");
      }
    }, [user, router]); 
  return (
    <div className="w-full max-w-[90%] flex items-center justify-center h-screen">
      <div>
        <h1>This is the Dashboard</h1>
      </div>
    </div>
  );
}