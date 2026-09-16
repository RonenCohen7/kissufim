import express, { Request, Response, NextFunction } from "express"
import { orderService } from "../services/order-service";
import { authMiddleware } from "../middleware/auth-middleware";
import { StatusCode } from "../model/enums";


class OrderController {

    public readonly router = express.Router();


    public constructor() {

        this.router.get("/api/admin/orders", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.getAllOrders);
        this.router.put("/api/admin/orders/:_id", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.updateOrder);
        this.router.delete("/api/admin/orders/:_id", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.deleteOrder);
        this.router.patch("/api/admin/orders/:_id/confirm-payment",authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.confirmPayment);


        this.router.get("/api/orders/:_id", authMiddleware.verifyLoggedIn, this.getOneOrder)

        this.router.post("/api/orders", authMiddleware.verifyLoggedIn, this.createOrder);

        this.router.patch("/api/orders/:_id/report-payment", authMiddleware.verifyLoggedIn, this.reportPayment);



    }


    //Admin get all orders
    private async getAllOrders(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {

            const orders = await orderService.getAllOrders();

            response.json(orders)

        } catch (err: any) {
            next(err)
        }
    }


    //Admin confirm payed
    private async confirmPayment(request: Request, response: Response, next: NextFunction): Promise<void> {
        
        try {
            const _id = String(request.params._id)

            const order = await orderService.confirmPayment(_id)

            response.json(order)

        }
        catch (err) {
            next(err)
        }
    }

    //Get One Order
    private async getOneOrder(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const _id = String(request.params._id)

            const userId = response.locals.user.userId;

            const order = await orderService.getOneOrder(
                _id,
                userId
            );

            response.json(order);

        } catch (err: any) {
            next(err)
        }
    }



    //Create New Order
    private async createOrder(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const userId = response.locals.user.userId;

            const order = await orderService.createOrder({
                userId,
                items: request.body.items,
                city: request.body.city,
                street: request.body.street,
                houseNumber: request.body.houseNumber,
                apartment: request.body.apartment,
                phone: request.body.phone
            })

            response.status(StatusCode.Created).json(order);

        } catch (err: any) {
            next(err);
        }
    }


    //Update order
    private async updateOrder(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {

            const _id = String(request.params._id);

            const order = await orderService.updateOrder(
                _id,
                request.body
            )

            response.json(order)

        } catch (err: any) {
            next(err);
        }
    }


    //Delete order
    private async deleteOrder(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const _id = String(request.params._id);

            await orderService.deleteOrder(_id);

            response.status(StatusCode.NoContent).send();

        } catch (err: any) {
            next(err)
        }
    }


    //Report payment
    private async reportPayment(request: Request, response: Response, next: NextFunction): Promise<void> {

        try {

            const _id = String(request.params._id);

            const userId = response.locals.user.userId;

            const order = await orderService.reportPayment(_id, userId)

            response.json(order)

        } catch (err) {

            next(err)
        }
    }

}

export const orderController = new OrderController();