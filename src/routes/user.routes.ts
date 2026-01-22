import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { createUserSchema } from "../utils/schemas/user.js";

// przygotowanie routów auth dla serwera
const router = Router();

router.get('/me/:id', AuthMiddleware, userController.userMe);
router.post('/create', validationMiddleware(createUserSchema), userController.create)

export default router;
