"use client";
import { loginFormData, loginSchema } from "@/schema/schema";
import { login } from "@/state/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<loginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  const router = useRouter()
  // Sync Redux error with local errors state
  useEffect(() => {
    if (error) {
      if (typeof error === "object" && error !== null && !Array.isArray(error)) {
        // Convert object error to field-specific errors
        const fieldErrors: Record<string, string> = {};
        Object.keys(error).forEach((key) => {
          const errorMessages = error[key];
          if (Array.isArray(errorMessages) && errorMessages.length > 0) {
            // Ensure we convert to string
            fieldErrors[key] = String(errorMessages[0]);
          } else if (typeof errorMessages === "string") {
            fieldErrors[key] = errorMessages;
          }
        });
        setErrors(fieldErrors);
      } else if (typeof error === "string") {
        // For string errors, clear field errors (will be shown in banner)
        setErrors({});
      }
    } else {
      setErrors({});
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(userData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    dispatch(login(userData));
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-xl max-w-[95%] border border-black/15 shadow-lg rounded-md">
        <form onSubmit={handleSubmit} className="p-4">
          {errors.message  && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
          <div className="flex flex-col p-2">
            <div className="grid mb-8">
              <h1 className="text-[22px] font-semibold text-slate-700">
                Login
              </h1>
              <p className="text-[15px] text-slate-500">
                Enter your info to login
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
              {errors.username && typeof errors.username === "string" && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
              <User className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
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
              {errors.password && typeof errors.password === "string" && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <LockKeyhole className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
            </div>
            <div className="grid gap-2 mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 text-center px-4 py-2 text-white font-medium disabled:opacity-50"
              >
                Login
              </button>
            </div>
            <p className="text-[15px]">
              Already have an account?{" "}
              <Link className="font-semibold text-blue-600" href={"register"}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
