import User from "../DB/models/user/user.model"
import { IUser } from "../interfaces/db-interfaces/user.db.interface";
import { AppError } from "../utils/error-handling/app-error"
import { asyncHandler } from "../utils/error-handling/async-handler"
import { verifyToken } from "../utils/token/token"
import { Request } from "express";
export interface AuthRequest extends Request {
    user?: IUser;
}

export const isAuthenticated = (bearerKey: string) => {
    return asyncHandler<AuthRequest>(async (req, res, next) => {
        const auth = req.headers.authorization

        if (!auth) return next(new AppError("Unauthorized: Missing authorization header", 401))

        if (!auth.startsWith(bearerKey)) return next(new AppError("Invalid bearer token", 401))

        try {
            const parts = auth.split(" ");
            if (parts.length !== 2) {
                return next(new AppError("Invalid Token format", 401));
            }
            const token = parts[1];
            const decodedToken = verifyToken(token);

            const user = await User.findById(decodedToken.id);

            if (!user) return next(new AppError("User no longer exists", 401));

            req.user = user;
            next();
        } catch (error) {
            return next(new AppError("Invalid or expired Token", 401));
        }
    });
}