import { NextFunction, Request, Response } from 'express'
import {ZodObject} from 'zod'
import { asyncHandler } from '../utils/error-handling/async-handler'

export const validate = (schema: ZodObject) =>{
    return asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    })
}