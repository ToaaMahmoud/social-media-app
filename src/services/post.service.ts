import Post from "../DB/models/post/post.model"
import { IPost } from "../interfaces/db-interfaces/post.db.interface"
import { AppError } from "../utils/error-handling/app-error"

interface UpdatePost{
    id: string
    userId: string
    updatedData: Partial<IPost>
}

interface DeletePost{
    id: string
    userId: string
}

export class PostService{
    static async create(postData: Partial<IPost>): Promise<IPost>{
        const post = await Post.create(postData)
        return post.toObject()
    }
    static async findAll(): Promise<IPost[]>{
        return await Post.find().populate("author", "name email").lean()
    }
    static async findById(id: string): Promise<IPost>{
        const post = await Post.findById(id).populate("author", "name email").lean()
        if(!post) throw new AppError("Post not found", 404)
        return post    
    }
    static async update({id, userId, updatedData}: UpdatePost):Promise<IPost>{
        const post = await Post.findById(id)
        if(!post) throw new AppError("Post not found", 404)
        if(post.author.toString() !== userId) throw new AppError("You are not authroized to update this post", 403)
        const updatedPost = await Post.findByIdAndUpdate(id, {$set: updatedData}, {new: true, runValidators: true})
        return updatedPost!      
    }
    static async remove({id, userId}: DeletePost):Promise<void>{
        const post = await Post.findById(id)
        if(!post) throw new AppError("Post not found", 404)
        if(post.author.toString() !== userId) throw new AppError("You are not authorized to delete this post", 403) 
        await Post.findByIdAndDelete(id)       
    }
}