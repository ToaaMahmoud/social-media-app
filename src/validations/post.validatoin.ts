import { Types } from "mongoose";
import z from "zod";

const objectRule = z.string().refine((val)=> Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ID format"
})

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(5, "Title must be at least 5 Characters")
        .max(100, "Title is too long"),
        content: z.string().min(10, "Content must be at least 10 characters")
    })
})
export const getPostByIdSchema = z.object({
    params: z.object({
        id: objectRule
    })
})
export const updatePostSchema = z.object({
    params: z.object({
        id: objectRule
    }),
    body: z.object({
        title: z.string().min(5).max(100).optional(),
        content: z.string().min(10).optional(),
    })
})

export const deletePostSchema = z.object({
    params: z.object({
        id: objectRule
    })
})