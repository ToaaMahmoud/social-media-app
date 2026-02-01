import { NextFunction, Response, Request } from "express";
import { AuthService } from "../services/auth.service";


export const signUp = async(req: Request, res: Response, next: NextFunction) =>{
    const result = await AuthService.signUp(req.body)
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data:{
            user: result.user
        }
    })
}

export const logIn = async(req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.login({email: req.body.email, password: req.body.password})
    res.status(201).json({
        success: true,
        message: "User logged in successfully",
        data:{
            user: result.user,
            token: result.token
        }
    })
}