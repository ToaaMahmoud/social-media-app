import User from "../DB/models/user/user.model";
import { IUser, IUserDocument } from "../interfaces/db-interfaces/user.db.interface";
import { AppError } from "../utils/error-handling/app-error";
import { asyncHandler } from "../utils/error-handling/async-handler";
import { verifyToken } from "../utils/token/token";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    user?: IUserDocument;
}

export const isAuthenticated = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    const bearerKey = process.env.BEARER_KEY || "Bearer";

    if (!auth) {
        return next(new AppError("Unauthorized: Missing authorization header", 401));
    }

    if (!auth.startsWith(bearerKey)) {
        return next(new AppError(`Invalid token: Must start with ${bearerKey}`, 401));
    }

    try {
        const parts = auth.split(" ");
        if (parts.length !== 2) {
            return next(new AppError("Invalid Token format", 401));
        }

        const token = parts[1];
        const decodedToken = verifyToken(token) as { id: string };

        const user = await User.findById(decodedToken.id).lean();

        if (!user) {
            return next(new AppError("User no longer exists", 401));
        }

        req.user = user as IUserDocument;
        next();
    } catch (error) {
        return next(new AppError("Invalid or expired Token", 401));
    }
});