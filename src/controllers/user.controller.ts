import type { NextFunction, Response } from "express";
import _ from 'lodash';
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { UserSchema } from "../utils/zod.schemas.js";
import { db } from "../db/db.js";

interface UserResponse{
  name: string;
  vorname: string;
  email: string;
}

class UserController {

    public userMe = async (req: AuthRequest, res: Response<UserResponse>, next: NextFunction) => {
        try {
            if (!req.user) throw { message: "Id wasnt passed", status: 401};
            const id: number = Number(req.user.userId);
            const paramId: number = Number(req.params.id);

            if (id !== paramId) throw { message: "False token was provided", status: 403};

            // pobranie danych z PostgreSQL
            const user = await db.user.findUnique({ where: { id }}); 
            // weryfikacja czy pobrane dane są kompletne
            const data = UserSchema.safeParse(user);

            if(!data.success){
            // Jeśli nie to rzucamy błąd który zostanie zcatchowany i odpowiednio zapisany w logach
            throw data.error.message
            }
            const userPick = _.pick(data.data, ['name','vorname','email'])
            // Jeśli wszystko się powiedzie to zwracamy dane i status do frontendu/mobile
            res.status(200).json(userPick)
        } catch (error) {
            console.log("/user/me Endpoint error: " + error);
            next(error);
        }
        }
}

export const userController = new UserController();