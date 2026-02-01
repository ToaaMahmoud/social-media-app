import {z} from "zod"

export const signUpSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't be longer than 50 characters"), 
    email: z.string().email("Invalid email address"),
    age: z.number().min(18, "User must be at least 18 years old"),
  }).required()
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't be longer than 50 characters"), 
})
})