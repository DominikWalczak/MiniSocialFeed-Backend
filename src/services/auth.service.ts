import { UserModel } from "../models/userModel.js";
import { comparePassword } from "../utils/password.js";

class AuthService {
    private readonly userModel = new UserModel();
    public async login(email: string, password: string){
        
        const user = this.userModel.findByEmail(email);

        if (!user) {
            const err: any = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        const verifyPass = comparePassword(password, user.password);

    }
}