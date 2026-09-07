import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../model/enums";
import { appConfig } from "../utils/app-config";
import { ClientError } from "../model/client-error";



class ErrorMiddleware {

    // Catch-All Middleware
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        const status =
            err.status || StatusCode.InternalServerError;

        let message: string;

        if (
            status === StatusCode.InternalServerError &&
            appConfig.isProduction
        ) {
            message = "Some error, please try again.";
        }
        else if (typeof err.message === "string") {
            message = err.message;
        }
        else if (err.message) {
            message = JSON.stringify(err.message);
        }
        else {
            message = String(err);
        }

        response.status(status).json({
            error: message
        });
    }

    // Route not found: 
    public routeNotFound(request: Request, response: Response, next: NextFunction) {
        const err = new ClientError(StatusCode.NotFound, `Route ${request.originalUrl} on method ${request.method} not found.`);
        next(err); // Go to catch-all.
    }

}

export const errorMiddleware = new ErrorMiddleware();
