import express, { Request, Response, NextFunction } from "express"
import { orderService } from "../services/order-service";
import { authMiddleware } from "../middleware/auth-middleware";
import { StatusCode } from "../model/enums";

class OrderController {

    public readonly router = express.Router();


    public constructor() {

        this.router.get("/api/orders", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.getAllOrders);
        this.router.put("/api/admin/orders/:_id", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.updateOrder);
        this.router.delete("/api/admin/orders/:_id", authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.deleteOrder);


        this.router.get("/api/orders/:_id", authMiddleware.verifyLoggedIn, this.getOneOrder)

        this.router.post("/api/orders", authMiddleware.verifyLoggedIn, this.createOrder);



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
                address: request.body.address,
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

}

export const orderController = new OrderController();