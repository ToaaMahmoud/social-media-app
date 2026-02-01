import { NextFunction, Request, Response} from "express";
import { PostService } from "../services/post.service";
import { IdParam } from "../interfaces/request-interfaces/post.res.interfaces";
import { AuthRequest } from "../middlewares/authentication.middleware";

type AuthRequestWithParams = AuthRequest & Request<IdParam>;

export const getAllPosts = async(req: Request, res: Response, next: NextFunction) => {
    const posts = await PostService.findAll()
    res.status(200).json({
        success: true,
        results: posts.length,
        data: posts
    })
}

export const createPost = async(req: AuthRequest, res: Response, next: NextFunction) => {    
    const userId = req.user?._id
    const post = await PostService.create({...req.body, author: userId})
    res.status(201).json({
        success: true,
        data: post
    })
}
export const getPostById = async(req: Request<IdParam>, res: Response, next: NextFunction) => {
    const post = await PostService.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: post
    })
} 

export const updatePostById = async(req: AuthRequestWithParams, res: Response, next: NextFunction) => {
    const userId = req.user!._id.toString();
    const post = await PostService.update({
        id: req.params.id,
        userId,
        updatedData: req.body
    })
    res.status(200).json({
        success: true,
        data: post
    })
}
export const deletePostById = async(req: AuthRequestWithParams
    , res: Response, next: NextFunction) => {
    const userId = req.user!._id.toString();
    await PostService.remove({id: req.params.id, userId})
    res.status(200).json({
        success: true,
        data: null
    })
}