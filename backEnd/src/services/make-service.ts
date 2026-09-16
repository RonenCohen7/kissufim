
import { IOrder } from "../model/order-model";
import { UserModel } from "../model/user-model";
import { appConfig } from "../utils/app-config";

class MakeService {

    public async sendNewOrder(order: IOrder): Promise<void>{

        if(!appConfig.makeNewOrderWebhookUrl) return;

        const items = order.items
            .map(items => `${items.name} x ${items.quantity}`)
            .join(", ")


        const user = await UserModel
            .findById(order.userId)
            .select("firstName lastName email")
            .lean();

        const customer = user 
            ? `${user.firstName} ${user.lastName}`
            : "";

        const response = await fetch(
            appConfig.makeNewOrderWebhookUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type" :"application/json"
                },
                body: JSON.stringify({
                    orderId: order._id.toString(),
                    date: order.createdAt,
                    customer: customer,
                    email: user?.email || "",
                    phone: order.phone,
                    items: items,
                    amount: order.totalPrice,
                    paymentMethod:order.paymentMethod || "bit",
                    paymentStatus:order.isPaid ? "paid" : "pending"
                })
            }
        )
        if(!response.ok) {
            throw new Error(`Make webhook failed: ${response.status}`)
        }
    }
}

export const makeService = new MakeService();