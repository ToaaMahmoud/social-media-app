import { Types } from "mongoose";
import { z } from "zod";

const objectIdRule = z.string().refine((val)=>Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ID format"
})
export const addUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't be longer than 50 characters"), 
    email: z.string().email("Invalid email address"),
    age: z.number().min(18, "User must be at least 18 years old"),
  }).strict()
});

export const getUserSchema = z.object({
    params: z.object({
        id: objectIdRule
    })
})

export const updateUserSchema = z.object({
    params: z.object({
        id: objectIdRule
    }),
    body: z.object({
        name: z.string().min(3).optional(),
        email: z.string().email().optional(),
        age: z.number().min(18).optional()
    }).strict()
})

export const deleteUserSchema = z.object({
    params: z.object({
        id: objectIdRule
    })
})