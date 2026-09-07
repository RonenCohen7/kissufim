import express, { Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../model/user-model";
import { authService } from "../services/auth-service";
import { StatusCode } from "../model/enums";
import { ClientError } from "../model/client-error";
import { authMiddleware } from "../middleware/auth-middleware";



class AuthController {

    public readonly router = express.Router();

    public constructor() {

        this.router.post("/api/auth/register", this.register);
        this.router.post("/api/auth/login", this.login);

        this.router.get("/api/auth/me", authMiddleware.verifyLoggedIn, this.getCurrentUser);


    }



    private async register(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const user = new UserModel(request.body)

            const registerUser = await authService.register(user);

            response.status(StatusCode.Created).json(registerUser)

        } catch (err: any) {
            next(err)
        }
    }



    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const { email , password } = request.body

            const token = await authService.login(
                email,
                password
            )

            response.json( {token})

        } catch (err: any) {
            next(err)
        }
    }


    //Get current user
    private async getCurrentUser(request:Request, response:Response, next:NextFunction):Promise<void>{

        try {

            const userId = response.locals.user.userId;

            const user = await authService.getCurrentUser(userId);

            response.json(user);

        } catch(err:any){
            next(err)
        }
    }


}


export const authController = new AuthController();