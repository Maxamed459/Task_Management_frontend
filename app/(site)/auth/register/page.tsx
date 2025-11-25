"use client";
import { registerFormData, registerSchema } from "@/schema/schema";
import { register } from "@/state/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<registerFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  

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

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(userData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      // ❌ STOP here — do not show success or loading
      Swal.fire({
        title: "Invalid Input",
        text: "Please fix the highlighted fields.",
        icon: "error",
      });
      return;
    }

    setErrors({});

      // 2️⃣ Show loading
    Swal.fire({
      title: "Please wait...",
      text: "Logging you in",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await dispatch(register(userData));

      if(res.payload?.error) {
        Swal.close();
        Swal.fire({
          title: "Login Failed",
          text: res.payload.error,
          icon: "error"
        });
        return;
      }

      Swal.close();

      Swal.fire({
        title: "Registration Successful",
        text: "You can now log in with your credentials.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false
      })
      
    } catch (error) {
      // If dispatch or API fails
      Swal.close();
      Swal.fire({
        title: "Something went wrong",
        text: "Try again later",
        icon: "error"
      });
    }

  };
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-xl max-w-[95%] border border-black/15 shadow-lg rounded-md mt-10">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col p-2">
            <div className="grid mb-8">
              <h1 className="text-[22px] font-semibold text-slate-700">
                Sign Up
              </h1>
              <p className="text-[15px] text-slate-500">
                Enter your info to create account
              </p>
            </div>
            <div className="w-full flex gap-2">
              <div className="grid gap-2 mb-4 relative">
                <label htmlFor="first_name">Fist Name</label>
                <input
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  type="text"
                  id="first_name"
                  className="px-10 py-2 rounded-md outline-1 outline-gray-600 focus:outline-2 focus:outline-blue-600 w-full"
                  placeholder="Enter your first name"
                />
                {errors.first_name && typeof errors.first_name === "string" && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
                <User className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
              </div>
              <div className="grid gap-2 mb-4 relative">
                <label htmlFor="last_name">Last Name</label>
                <input
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  type="text"
                  id="last_name"
                  className="px-10 py-2 rounded-md outline-1 outline-gray-600 focus:outline-2 focus:outline-blue-600 w-full"
                  placeholder="Enter your last name"
                />
                {errors.last_name && typeof errors.last_name === "string" && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
                <User className="absolute left-2 top-10 cursor-pointer text-blue-600 w-5" />
              </div>
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
              {errors.email && typeof errors.email === "string" || errors.non_field_errors && (
                <p className="text-red-500 text-sm">{errors.email} {errors.non_field_errors}</p>
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
              {errors.password && typeof errors.password === "string" && (
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
              {errors.confirm && typeof errors.confirm === "string" && (
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
              <Link className="font-semibold text-blue-600" href={"login"}>
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
