import { Router } from "express";
import { validate } from "../middlewares/validation.schema";
import { loginSchema, signUpSchema } from "../validations/auth.validation";
import { asyncHandler } from "../utils/error-handling/async-handler";
import * as authController from  "../controllers/auth.controller";
const authRouter  = Router()
authRouter.post("/sign-up",validate(signUpSchema),asyncHandler(authController.signUp))
authRouter.post("/login", validate(loginSchema),asyncHandler(authController.logIn))

export default authRouter