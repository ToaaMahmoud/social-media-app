import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { asyncHandler } from "../utils/error-handling/async-handler";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAuthorized } from "../middlewares/authorization.middleware";
import { UserRoles } from "../interfaces/db-interfaces/user.db.interface";
import { validate } from "../middlewares/validation.schema";
import { createPostSchema, deletePostSchema, getPostByIdSchema, updatePostSchema } from "../validations/post.validatoin";

const postRouter = Router()
postRouter.get("/", isAuthenticated, isAuthorized(UserRoles.ADMIN),asyncHandler(postController.getAllPosts))
postRouter.post("/",isAuthenticated, isAuthorized(UserRoles.USER),validate(createPostSchema),asyncHandler(postController.createPost))
postRouter.get("/:id", isAuthenticated, isAuthorized(UserRoles.USER),validate(getPostByIdSchema),postController.getPostById)
postRouter.delete("/:id", isAuthenticated, isAuthorized(UserRoles.USER, UserRoles.ADMIN),validate(deletePostSchema),postController.deletePostById)
postRouter.put("/:id",isAuthenticated, isAuthorized(UserRoles.USER),validate(updatePostSchema),postController.updatePostById)

export default postRouter