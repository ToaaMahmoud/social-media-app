import { AppError } from "../utils/error-handling/app-error"
import { asyncHandler } from "../utils/error-handling/async-handler"
import { AuthRequest } from "./authentication.middleware"

export const isAuthorized = (...roles: string[]) => {
    return asyncHandler<AuthRequest>(async(req, res, next) => {
        if(!req.user) return next(new AppError("User not found", 401))
        if(!roles.includes(req.user.role)) return next(new AppError("Unauthorized account", 401))
        next()    
    })
}