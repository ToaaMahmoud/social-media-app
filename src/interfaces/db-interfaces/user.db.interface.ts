import { Document } from "mongoose";

export enum UserRoles{
    ADMIN = "admin",
    USER = "user"
}
export interface IUser {
    name: string;
    email: string;
    password: string
    age: number
    role: UserRoles;
}

export interface IUserDocument extends IUser, Document {}