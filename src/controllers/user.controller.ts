import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IdParam } from "../interfaces/request-interfaces/user.req.interfaces";
import { IUser } from "../interfaces/db-interfaces/user.db.interface";


export const addUser = async (
  req: Request<any, any, IUser>,
  res: Response,
  next: NextFunction
) => {
  const newUser = await UserService.create(req.body);

  res.status(201).json({
    status: "success",
    data: newUser,
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await UserService.findAll();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
};

export const getUserById = async (
  req: Request<IdParam>,
  res: Response,
  next: NextFunction
) => {
  const user = await UserService.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: user,
  });
};


export const updateUser = async (
  req: Request<IdParam, any, Partial<IUser>>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updatedData = req.body;

  const user = await UserService.update({ id, updatedData });

  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const deleteUser = async (
  req: Request<IdParam>,
  res: Response,
  next: NextFunction
) => {
  await UserService.remove(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};
