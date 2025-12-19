import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { LoginSchema } from "../utils/schemas/auth/loginSchema.js";
import { LogOutSchema } from "../utils/schemas/auth/logoutSchema.js";

// przygotowanie routów auth dla serwera
const router = Router();

router.post('/login', validationMiddleware(LoginSchema), authController.login);
router.post('/logout', validationMiddleware(LogOutSchema), authController.logout);

export default router;
