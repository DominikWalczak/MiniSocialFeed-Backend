import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtVerifyAccessToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
    }
}
export const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log(0);
        const t = req.headers.authorization;
        console.log(1);
        if (!t) throw { message: "No token provided", status: 401};
        const token = t.startsWith("Bearer ") 
            ? t.split(" ")[1] 
            : t;

        console.log(4);
        console.log(t);
        console.log(token);
        console.log(4);
        const tokenCheck = jwtVerifyAccessToken(token);
        console.log(4);
        req.user = { userId: tokenCheck.id}
        console.log(5);

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) next({ message: "Token expired ", status: 401});
        else if (error instanceof jwt.JsonWebTokenError) next({ message: "Invalid token", status: 401});
        else next(error);
        
    }
}