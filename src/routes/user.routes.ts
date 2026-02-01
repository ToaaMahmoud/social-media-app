import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { asyncHandler } from "../utils/error-handling/async-handler";
import { validate } from "../middlewares/validation.schema";
import { addUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "../validations/user.validation";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAuthorized } from "../middlewares/authorization.middleware";
import { UserRoles } from "../interfaces/db-interfaces/user.db.interface";

const userRouter = Router()
userRouter.get("/", isAuthenticated, isAuthorized(UserRoles.ADMIN),asyncHandler(userController.getAllUsers))
userRouter.post("/", isAuthenticated, isAuthorized(UserRoles.ADMIN),validate(addUserSchema), asyncHandler(userController.addUser))
userRouter.get("/:id",isAuthenticated, isAuthorized(UserRoles.ADMIN), validate(getUserSchema),asyncHandler(userController.getUserById))
userRouter.put("/:id",isAuthenticated, isAuthorized(UserRoles.ADMIN), validate(updateUserSchema),asyncHandler(userController.updateUser))
userRouter.delete("/:id",isAuthenticated, isAuthorized(UserRoles.ADMIN), validate(deleteUserSchema),asyncHandler(userController.deleteUser))

export default userRouter