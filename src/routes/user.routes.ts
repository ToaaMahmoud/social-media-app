import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { asyncHandler } from "../utils/error-handling/async-handler";
import { validate } from "../middlewares/validation.schema";
import { addUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "../validations/user.validation";

const userRouter = Router()
userRouter.get("/", asyncHandler(userController.getAllUsers))
userRouter.post("/", validate(addUserSchema), asyncHandler(userController.addUser))
userRouter.get("/:id", validate(getUserSchema),asyncHandler(userController.getUserById))
userRouter.put("/:id", validate(updateUserSchema),asyncHandler(userController.updateUser))
userRouter.delete("/:id", validate(deleteUserSchema),asyncHandler(userController.deleteUser))

export default userRouter