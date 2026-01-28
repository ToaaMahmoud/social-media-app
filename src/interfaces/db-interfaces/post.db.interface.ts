import { Document, Types } from "mongoose";

export interface IPost{
    title: string;
    content: string;
    author: Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostDocument extends IPost, Document{}