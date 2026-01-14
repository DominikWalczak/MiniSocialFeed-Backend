import { Router } from "express";
import { postController } from "../controllers/post.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

// przygotowanie routów auth dla serwera
const router = Router();

router.get('/', AuthMiddleware, postController.getList);
router.post('/', AuthMiddleware, postController.post);
router.delete('/', AuthMiddleware, postController.deletePost);


export default router;
