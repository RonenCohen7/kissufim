import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/user-model";
import { authService } from "../services/auth-service";
import { StatusCode } from "../model/enums";



class AuthController {

    public readonly router = express.Router();

    public constructor() {

        this.router.post("/api/auth/register", this.register);
        this.router.post("/api/auth/login", this.login);


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

}


export const authController = new AuthController();