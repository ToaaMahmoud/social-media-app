import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { asyncHandler } from "../utils/error-handling/async-handler";

const postRouter = Router()
postRouter.get("/", asyncHandler(postController.getAllPosts))
postRouter.post("/",asyncHandler(postController.createPost))
postRouter.get("/:id", postController.getPostById)
postRouter.delete("/:id", postController.deletePostById)
postRouter.put("/:id", postController.updatePostById)

export default postRouter