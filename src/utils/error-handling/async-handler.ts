import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

// Generic async handler that supports typed request/response
export const asyncHandler = <Req extends Request = Request,Res extends Response = Response>(
    fn: (req: Req, res: Res, next: NextFunction) => Promise<any>,
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req as Req, res as Res, next).catch((err: any) => {
            next(new AppError(err.message, err.status || 500));
        });
    };
};