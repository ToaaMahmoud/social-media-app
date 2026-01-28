import { NextFunction, Request, Response} from "express";

export const getAllPosts = async(req: Request, res: Response, next: NextFunction) => {
    res.send("Get all posts");
}

export const createPost = async(req: Request, res: Response, next: NextFunction) => {
    res.send("Create a post");
}
export const getPostById = async(req: Request, res: Response, next: NextFunction) => {
    res.send(`Get post with ID ${req.params.id}`);
} 
export const deletePostById = async(req: Request, res: Response, next: NextFunction) => {
    res.send(`Delete post with ID ${req.params.id}`);
}

export const updatePostById = async(req: Request, res: Response, next: NextFunction) => {
    res.send(`Update post with ID ${req.params.id}`);
}