import z from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export type UserData = z.infer<typeof userSchema>
export type loginFormData = z.infer<typeof loginSchema>;
export type registerFormData = z.infer<typeof registerSchema>;
