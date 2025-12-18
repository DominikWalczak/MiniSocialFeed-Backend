import type { Request, Response, NextFunction } from "express";
import type { LoginType } from "../utils/schemas/auth/loginSchema.js";
import { AuthService } from "../services/auth.service.js";

// klasa zawierająca zbiór funkcji związanych z logowaniem
class AuthController {
    private readonly authService = new AuthService();
    public async login(req: Request<unknown, unknown, LoginType>, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body;

            const {user, token} = await this.authService.login(email, password);

            return res.status(200).json({
                message: "Login successful",
                data: {
                    user, 
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();