import { UserLoginDto } from "../dto/userLogin.dto.js";
import { UserModel } from "../models/userModel.js";
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

        
        return 1;
    }
}