import _ from 'lodash';
import { jwtSignAccessToken, jwtSignRefreshToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";
import { db } from "../db/db.js";

interface HttpError extends Error {
    status?: number;
}

export class AuthService {
    public async login(email: string, password: string){
        // weryfikacja czy konto na podstawie podanego maila istnieje, inaczej error z info
        const user = await db.user.findUnique({
            where: {email},
        });

        if (!user) {
            const err: HttpError = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }
        // weryfikacja czy podane hasło jest poprawne, inaczej error z info
        const verifyPass = comparePassword(password, user.password);

        if (!verifyPass){
            const err: HttpError = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        // wybieram tylko userId oraz email
        const userPick = _.pick(user, ['userId','email'])

        const payload = { 
            id: user.id, 
            email: user.email 
        };
        // tworzenie tokenu
        const accessToken = jwtSignAccessToken(payload);
        const refreshToken = jwtSignRefreshToken(payload);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + Number(process.env.JWT_REFRESH_EXPIRES_NUMBER_ONLY));

        await db.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshToken,
                expiresAt: expiresAt,
            }
            });

        return {
            user: userPick,
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }
    public async logout(token: string){
        // funkcja służąca do wylogowania
        await db.refreshToken.updateMany({
                where: { tokenHash: token },
                data: { revokedAt: new Date() }
            });
        return { message: "Logged out" };
    }
}