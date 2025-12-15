import type { Request, Response, NextFunction } from "express";

class AuthController {

    public async login(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body;

            return res.status(200).json({message: "Login successful"});
        } catch (error) {
            next(error);
        }
    }
}