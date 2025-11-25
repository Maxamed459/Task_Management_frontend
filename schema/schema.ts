import { title } from "process";
import z from "zod";
import { de } from "zod/locales";

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "first name must be at least 3 characters long")
      .max(10, "first name too long"),
    last_name: z
      .string()
      .min(3, "last name must be at least 3 characters long")
      .max(10, "last name too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  priority: z.enum(["low", "medium", "high"]),
  is_completed: z.boolean(),
})

export type UserData = z.infer<typeof userSchema>
export type loginFormData = z.infer<typeof loginSchema>;
export type registerFormData = z.infer<typeof registerSchema>;
