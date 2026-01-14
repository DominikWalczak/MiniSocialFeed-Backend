import type { Request, Response, NextFunction } from "express";
import type { LoginType } from "../utils/schemas/auth.js";
import { AuthService } from "../services/auth.service.js";
import type { LogOutType } from "../utils/schemas/auth.js";

// klasa zawierająca zbiór funkcji związanych z logowaniem
class AuthController {
    private readonly authService = new AuthService();
    public login = async (req: Request<unknown, unknown, LoginType>, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const {user, accessToken, refreshToken} = await this.authService.login(email, password);

            return res.status(200).json({
                message: "Login successful",
                data: {
                    user, 
                    accessToken,
                    refreshToken
                },
            });
        } catch (error) {
            next(error);
        }
    }
    public logout = async (req: Request<unknown, unknown, LogOutType>, res: Response, next: NextFunction) => {
        try {
            const { token } = req.body;
            const message = await this.authService.logout(token);
            return res.status(200).json({ message: "message" });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();