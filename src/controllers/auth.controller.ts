import type { Request, Response, NextFunction } from "express";
import type { LoginType } from "../utils/schemas/auth/loginSchema.js";

// klasa zawierająca zbiór funkcji związanych z logowaniem
class AuthController {

    public async login(req: Request<unknown, unknown, LoginType>, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body;

            return res.status(200).json({message: "Login successful"});
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();