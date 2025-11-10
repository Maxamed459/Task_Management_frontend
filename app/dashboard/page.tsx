"use client"
import z from "zod";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/state/store";
import { useRouter } from "next/navigation";
import { UserData } from "@/schema/schema";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();
      setUsers(users)
    }
    
  })

  const result = z.array(userSchema).safeParse(users);

  if (!result.success) {
    console.error("Invalid API response:", result.error);
  } else {
    console.log("Users:", result.data);
  }
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);
  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      {users.map((user: z.infer<typeof userSchema>) => (
        <div
          className="p-4 shadow-lg rounded-md bg-white text-black"
          key={user.id}
        >
          <h2>
            <strong>Id:</strong> {user.id}
          </h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}
