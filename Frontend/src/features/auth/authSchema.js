import {z} from "zod"

export const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
    password:z.string()
    .trim()
    .min(1, "Password is required")
    
})


export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });