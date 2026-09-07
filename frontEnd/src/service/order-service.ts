import axios from "axios";
import type { createOrderData, orderModel, updateOrderData } from "../models/order-model";
import { appConfig } from "../utils/app-config";



class OrderService {


    //Get All Orders - Admin
    public async getAllOrders(token: string): Promise<orderModel[]> {

        const response = await axios.get<orderModel[]>(
            appConfig.adminOrderUrl,
            {
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }



    //Get One Order
    public async getOneOrder(_id: string, token: string): Promise<orderModel> {

        const response = await axios.get<orderModel>(
            `${appConfig.ordersUrl}/${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }


    //Create Order 
    public async addOrder(order: createOrderData, token: string): Promise<orderModel> {
        const response = await axios.post<orderModel>(
            appConfig.ordersUrl,
            order,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }


    //Update order- Admin
    public async updateOrder(_id: string, order: updateOrderData, token: string): Promise<orderModel> {

        const response = await axios.put<orderModel>(
            `${appConfig.adminOrderUrl}/${_id}`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            }
        );

        return response.data;
    }


    //Delete Order - Admin
    public async deleteOrder(_id: string, token:string):Promise<void>{
        await axios.delete(
            `${appConfig.adminOrderUrl}/${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}




export const orderService = new OrderService();

