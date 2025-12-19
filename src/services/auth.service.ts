import { UserLoginDto } from "../dto/userLogin.dto.js";
import { UserModel } from "../models/userModel.js";
import { jwtSignAccessToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";

export class AuthService {
    private readonly userModel = new UserModel();
    public async login(email: string, password: string){
        
        // weryfikacja czy konto na podstawie podanego maila istnieje, inaczej error z info
        const user = await this.userModel.findByEmail(email);

        if (!user) {
            const err: any = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }
        // weryfikacja czy podane hasło jest poprawne, inaczej error z info
        const verifyPass = comparePassword(password, user.password);

        if (!verifyPass){
            const err: any = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        const userLoginDto = UserLoginDto.fromPrismaUserLogin(user);

        const payload = { 
            id: user.userId, 
            email: user.email 
        };
        // tworzenie tokenu
        const accessToken = jwtSignAccessToken(payload);
        const refreshToken = jwtSignAccessToken(payload);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + Number(process.env.JWT_REFRESH_EXPIRES_NUMBER_ONLY));

        await this.userModel.saveRefreshToken(user.userId, refreshToken, expiresAt);

        return {
            user: userLoginDto,
            token: accessToken,
        }
    }
    public async logout(token: string){
        // funkcja służąca do wylogowania
        await this.userModel.revokeRefreshToken(token);
        return { message: "Logged out" };
    }
}