import { ClientError } from "../model/client-error";
import { StatusCode } from "../model/enums";
import { IUser, UserModel } from "../model/user-model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { appConfig } from "../utils/app-config";



class AuthService { 


    //Register
    public async register(user:IUser):Promise<IUser>{

        const existingUser = await UserModel.findOne({
            email: user.email
        }).exec();

        if(existingUser) {
            throw new ClientError(StatusCode.BadRequest,"Email Already exists")
        }

        user.password = await bcrypt.hash(user.password, 12);

        const dbUser = new UserModel(user)

        return dbUser.save();
    }




    //Login
   public async login(email: string, password: string): Promise<string> {

    const user = await UserModel
        .findOne({ email })
        .select("+password")
        .exec();

    if (!user) {
        throw new ClientError(
            StatusCode.Unauthorized,
            "Incorrect email or password"
        );
    }

    if (!user.isActive) {
        throw new ClientError(
            StatusCode.Unauthorized,
            "User is inactive"
        );
    }

    const passwordMatch =
        await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new ClientError(
            StatusCode.Unauthorized,
            "Incorrect email or password"
        );
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        appConfig.jwtSecret,
        {
            expiresIn: "7d"
        }
    );

    return token;
}

    
}



export const authService = new AuthService();