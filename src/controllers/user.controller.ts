import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IdParam } from "../interfaces/request-interfaces/user.req.interfaces";
import { AppError } from "../utils/error-handling/app-error";
import { IUser } from "../interfaces/db-interfaces/user.db.interface";

export const addUser = async(    
    req: Request<any, any, IUser>,
    res: Response,
    next: NextFunction,) =>{
     const newUser = await UserService.create(req.body);
        res.status(201).json({
            status: "success",
            data: newUser,
        });

}
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const users = await UserService.findAll();
    res.status(200).json({
        status: "Success",
        results: users.length,
        data: users,
    });
};
export const getUserById = async (
    req: Request<IdParam>,
    res: Response,
    next: NextFunction,
) => {
    const user = await UserService.findById(req.params.id);
    res.status(200).json({ status: "Success", data: user })
};
export const updateUser = async (
    req: Request<IdParam, any, Partial<IUser>>,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await UserService.update({ id, updatedData });
    if (!user) next(new AppError("User not found", 404));
    res.status(200).json({ status: "Success", data: user });
};
export const deleteUser = async (
    req: Request<IdParam>,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    const user = await UserService.remove(id);
    if (!user) next(new AppError("User not found", 404));
    res
        .status(200)
        .json({ status: "Success", message: "User deleted successfully" });
};
