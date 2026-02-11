import type { NextFunction, Response, Request } from "express";
import _ from 'lodash';
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { UserSchema } from "../utils/schemas/user.js";
import { db } from "../db/db.js";
import { hashPassword } from "../utils/password.js";

interface UserResponse{
  name: string;
  vorname: string;
  email: string;
}

interface CreateResponse {
    message: string;
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
            throw { message: data.error.message, status: 404}
            }
            const userPick = _.pick(data.data, ['name','vorname','email'])
            // Jeśli wszystko się powiedzie to zwracamy dane i status do frontendu/mobile
            return res.status(200).json(userPick);
        } catch (error) {
            next(error);
        }
    }
    public create = async (req: Request, res: Response<CreateResponse>, next: NextFunction) => {
        try {
            if (!req.body) throw { message: "Required data wasn't passed", status: 401};
            const email = req.body.email;

            const user = await db.user.findUnique({ where: { email }}); 

            if (user) throw { message: "User with such a credentials already exists", status: 401};

            const hashedPass = await hashPassword(req.body.password);
            const newUser = await db.user.create({
                data: {
                    email: email,
                    name: req.body.name,
                    vorname: req.body.vorname,
                    password: hashedPass,
                }
            })

            if (!newUser) throw { message: "An error occurred and user wasn't created", status: 401};

            return res.status(201).json({message: "User created successfully"});
        } catch (error) {
            next(error);
        }
    }

}

export const userController = new UserController();