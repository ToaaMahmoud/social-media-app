import User from "../DB/models/user/user.model";
import { IUser } from "../interfaces/db-interfaces/user.db.interface";
import { AppError } from "../utils/error-handling/app-error";
import { comparePassword } from "../utils/hashing/hashing";
import { generateToken } from "../utils/token/token";
import { UserService } from "./user.service";

export class AuthService {
    static async signUp(user: IUser) {
        const newUser = await UserService.create(user)
        const {password: _password, ...safeUser} = newUser
        return {user: safeUser}
    }
    static async login(credentials: { email: string, password: string }) {
        const { email, password } = credentials
        const user = await User.findOne({ email }).select("+password")

        if (!user) throw new AppError("Invalid email or password", 401)

        // isPasswordMatch
        const isPasswordMatch = await comparePassword({ password, hashedPassword: user.password })
        if (!isPasswordMatch) throw new AppError("Invalid email or password", 401)

        const token = generateToken({
            payload: {
                id: user._id.toString(),
                role: user.role,
            },
        });
        const { password: _password,...safeUser } = user.toObject();

        return { user: safeUser, token }
    }
}