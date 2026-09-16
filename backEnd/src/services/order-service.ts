import { it } from "node:test";
import { ClientError } from "../model/client-error";
import { StatusCode } from "../model/enums";
import { IOrder, IOrderItem, OrderModel } from "../model/order-model";
import { ProductModel } from "../model/product-model";
import { makeService } from "./make-service";
import { productService } from "./product-service";

interface CreateOrderItem {
    productId: string;
    quantity: number;
}

interface CreateOrderData {
    userId: string;
    items: CreateOrderItem[];
    city: string;
    street: string;
    houseNumber: string;
    apartment?: string;
    phone: string;
}

class OrderService {

    // Get all orders
    public async getAllOrders(): Promise<IOrder[]> {
        return OrderModel
            .find()
            .sort({ createdAt: -1 })
            .exec();
    }


    // Get one order
    public async getOneOrder(_id: string, userId: string): Promise<IOrder> {

        const order = await OrderModel
            .findById(_id)
            .exec();

        if (!order) {
            throw new ClientError(
                StatusCode.NotFound,
                `Order ${_id} not found`
            );
        }

        return order;
    }


    // Create order
    public async createOrder(orderData: CreateOrderData): Promise<IOrder> {

        if (!orderData.items || orderData.items.length === 0) {
            throw new ClientError(
                StatusCode.BadRequest,
                "Order must contain at least one product"
            );
        }

        const orderItems: IOrderItem[] = [];

        let totalPrice = 0;

        for (const item of orderData.items) {

            if (!item.quantity || item.quantity < 1) {
                throw new ClientError(
                    StatusCode.BadRequest,
                    "Invalid product quantity"
                );
            }

            const product = await ProductModel
                .findById(item.productId)
                .exec();

            if (!product || !product.isActive) {
                throw new ClientError(
                    StatusCode.NotFound,
                    `Product ${item.productId} not found`
                );
            }

            if (product.stock < item.quantity) {
                throw new ClientError(
                    StatusCode.BadRequest,
                    `Not enough stock for ${product.name}`
                );
            }

            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                imageName: product.imageName
            });

            totalPrice += product.price * item.quantity;
        }

        const order = new OrderModel({
            userId: orderData.userId,
            items: orderItems,
            totalPrice,
            city: orderData.city,
            street: orderData.street,
            houseNumber: orderData.houseNumber,
            apartment: orderData.apartment,
            phone: orderData.phone,
            status: "pending",
            isPaid: false
        });

        const saveOrder = await order.save()

        // try {
        //      await makeService.sendNewOrder(saveOrder)
        // }
        // catch(err){
        //     console.error("Failed to send order to Mack", err)
        // }

        return saveOrder;
    }


    // Update order
    public async updateOrder(_id: string, orderData: Partial<IOrder>): Promise<IOrder> {

        const dbOrder = await OrderModel
            .findByIdAndUpdate(
                _id,
                orderData,
                {
                    returnDocument: "after",
                    runValidators: true
                }
            )
            .exec();

        if (!dbOrder) {
            throw new ClientError(
                StatusCode.NotFound,
                `Order ${_id} not found`
            );
        }

        return dbOrder;
    }


    // Delete order
    public async deleteOrder(_id: string): Promise<void> {

        const dbOrder = await OrderModel
            .findByIdAndDelete(_id)
            .exec();

        if (!dbOrder) {
            throw new ClientError(
                StatusCode.NotFound,
                `Order ${_id} not found`
            );
        }
    }

    //report payment
    public async reportPayment(_id: string, userId: string): Promise<IOrder> {

        const order = await OrderModel.findOne({
            _id,
            userId
        }).exec();

        if (!order) {
            throw new ClientError(StatusCode.NotFound, `Order ${_id} not found`)
        }

        if (order.status !== "pending") {
            throw new ClientError(StatusCode.BadRequest, "Order is not pending")
        }
        order.status = "payment_reported"

        return order.save();
    }


    //Admin confirm payment
    public async confirmPayment(_id: string): Promise<IOrder> {

        const order = await OrderModel.findById(_id).exec();

        if (!order) {
            throw new ClientError(StatusCode.NotFound, `Order ${_id} not found`)
        }

        //prevent double confirmation
        if (order.isPaid) {
            return order;
        }

        if (order.status !== "payment_reported") {
            throw new ClientError(
                StatusCode.BadRequest,
                "Payment was not reported for this order"
            )
        }

        //Check stock before changing anything
        for (const item of order.items) {

            const product = await ProductModel.findById(item.productId).exec();

            if (!product) {
                throw new ClientError(StatusCode.NotFound, `Product ${item.productId} not found`)
            }

            if (product.stock < item.quantity) {
                throw new ClientError(StatusCode.BadRequest, `Not enough stock for ${product.name}`)
            }

            //reduce stock
            for (const item of order.items) {
                await ProductModel.findByIdAndUpdate(
                    item.productId,
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                ).exec()
            }
        }


        //Mark order as paid
        order.status = "paid";
        order.isPaid = true;
        order.paidAt = new Date()
        order.paymentMethod = "bit";



        //Send Email and order to google sheet
        try {
            await makeService.sendNewOrder(order)
        }
        catch (err) {
            console.error
        }

        return order.save();
    }
}

export const orderService = new OrderService();