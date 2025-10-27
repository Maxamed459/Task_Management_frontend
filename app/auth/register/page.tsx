"use client";
import { registerFormData, registerSchema } from "@/schema/schema";
import { register } from "@/state/authentication/autheSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<registerFormData>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(userData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    dispatch(register(userData));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-xl max-w-3xl border border-black/15 shadow-lg rounded-md">
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <p className="text-red-600 bg-red-300 p-4 rounded-md">{error}</p>
          )}
          <div className="flex flex-col p-2">
            <div className="grid mb-8">
              <h1 className="text-[22px] font-semibold text-slate-700">
                Sign Up
              </h1>
              <p className="text-[15px] text-slate-500">
                Enter your info to create account
              </p>
            </div>
            <div className="grid gap-2 mb-4 relative">
              <label htmlFor="username">Username</label>

              <input
                name="username"
                value={userData.username}
                onChange={handleChange}
                type="text"
                id="username"
                className="px-10 py-2 rounded-md outline-1 outline-gray-600 focus:outline-2 focus:outline-blue-600 group"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
              <User className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
            </div>
            <div className="grid gap-2 mb-4 relative">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                type="email"
                id="email"
                className="px-10 py-2 rounded-md outline-1 focus:outline-2 focus:outline-blue-600"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <Mail className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
            </div>
            <div className="grid gap-2 mb-4 relative">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                value={userData.password}
                onChange={handleChange}
                type="password"
                id="password"
                className="px-10 py-2 rounded-md outline-1 focus:outline-2 focus:outline-blue-600"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <LockKeyhole className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
            </div>
            <div className="grid gap-2 mb-4 relative">
              <label htmlFor="confirm">Confirm</label>
              <input
                name="confirm"
                value={userData.confirm}
                onChange={handleChange}
                type="password"
                id="confirm"
                className="px-10 py-2 rounded-md outline-1 focus:outline-2 focus:outline-blue-600"
                placeholder="Confirm your password"
              />
              {errors.confirm && (
                <p className="text-red-500 text-sm">{errors.confirm}</p>
              )}
              <LockKeyhole className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
            </div>
            <div className="grid gap-2 mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 text-center px-4 py-2 text-white font-medium disabled:opacity-50"
              >
                SignUp
              </button>
            </div>
            <p className="text-[15px]">
              Already have an account?{" "}
              <Link
                className="font-bold underline text-blue-600"
                href={"login"}
              >
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
