import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { appConfig } from "../utils/app-config";
import { ClientError } from "../model/client-error";
import { StatusCode } from "../model/enums";

interface UserPayload extends JwtPayload {
    userId: string;
    role: "customer" | "admin";
}

class AuthMiddleware {

    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {
        try {
            const authorization = request.header("authorization");

            if (!authorization?.startsWith("Bearer ")) {
                throw new ClientError(
                    StatusCode.Unauthorized,
                    "You are not logged in"
                );
            }

            const token = authorization.substring(7);

            const payload = jwt.verify(
                token,
                appConfig.jwtSecret
            ) as UserPayload;

            response.locals.user = payload;

            next();
        }
        catch (err: any) {

            if (err instanceof ClientError) {
                next(err);
                return;
            }

            next(
                new ClientError(
                    StatusCode.Unauthorized,
                    "Invalid or expired token"
                )
            );
        }
    }


    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {
        try {
            const user = response.locals.user as UserPayload;

            if (!user) {
                throw new ClientError(
                    StatusCode.Unauthorized,
                    "You are not logged in"
                );
            }

            if (user.role !== "admin") {
                throw new ClientError(
                    StatusCode.Forbidden,
                    "You are not authorized"
                );
            }

            next();
        }
        catch (err: any) {
            next(err);
        }
    }






}

export const authMiddleware = new AuthMiddleware();