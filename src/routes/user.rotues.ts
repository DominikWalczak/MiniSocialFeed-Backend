import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

// przygotowanie routów auth dla serwera
const router = Router();

router.get('/me/:id', AuthMiddleware, userController.userMe);
router.post('/create', userController.create)

export default router;
