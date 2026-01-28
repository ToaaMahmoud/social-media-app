import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

export const globalError = (err: AppError, req: Request,res: Response,next: NextFunction) =>{
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        success: false,
        message: err.message,
        status: statusCode
    })
}