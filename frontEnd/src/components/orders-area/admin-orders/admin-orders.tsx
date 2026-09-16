import { useTranslation } from "react-i18next";
import "./admin-orders.css";
import { useEffect, useState } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { orderService } from "../../../service/order-service";
import type { orderModel } from "../../../models/order-model";
import { dialogService } from "../../../service/dialogService";



export function AdminOrders() {

    const { t } = useTranslation();

    const [orders, setOrders] = useState<orderModel[]>([]);



    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) return;

        orderService
            .getAllOrders(token)
            .then(setOrders)
            .catch(console.error)


    }, []);

    const changeStatus = async (orderId: string, status: orderModel["status"]) => {
        const token = localStorage.getItem("token")
        if (!token) return;
        try {
            const updateOrder = await orderService.updateOrder(
                orderId,
                { status },
                token
            )
            setOrders(currentOrders =>
                currentOrders.map(order =>
                    order._id === updateOrder._id
                        ? updateOrder
                        : order
                )
            )
        } catch (err) {
            console.error
        }
    }
    const confirmPayment = async (orderId: string) => {

        const confirmed = await dialogService.confirm(
            t("adminOrder.confirmPaymentTitle"),
            t("adminOrders.confirmPaymentText"),
            t("adminOrders.confirmPayment"),
            t("payment.cancel")
        )

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const updateOrder = await orderService.confirmPayment(
                orderId,
                token
            )

            setOrders(currentOrders =>
                currentOrders.map(order =>
                    order._id === updateOrder._id
                        ? updateOrder
                        : order
                )
            )
            await dialogService.success(
                t("adminOrders.paymentConfirmedTitle"),
                t("adminOrders.paymentConfirmedText")
            )
        }
        catch (err) {
            console.error
        }

    }


    return (
        <div className="AdminOrders">

            <h1>{t("adminOrders.title")}</h1>

            {orders.map(order => (
                <div className="admin-order" key={order._id}>

                    <p>
                        {t("adminOrders.orderNumber")}:{order._id}
                    </p>

                    <p>
                        {t("adminOrders.total")}{" "}
                        {order.totalPrice.toLocaleString()} ₪
                    </p>

                    {!order.isPaid && (
                        <p>
                            {t("adminOrders.status")}:{" "}
                            {t(`orderStatus.${order.status}`)}
                        </p>
                    )}
                    {order.status === "payment_reported" && (
                        <Button
                            variant="contained"
                            onClick={() => confirmPayment(order._id)}

                        >
                            {t("adminOrders.confirmPayment")}
                        </Button>
                    )}

                    {order.isPaid && (
                        <FormControl size="small">

                            <Select
                                value={order.status}
                                onChange={event =>
                                    changeStatus(
                                        order._id,
                                        event.target.value as orderModel["status"]
                                    )
                                }
                            >
                                <MenuItem value="paid">
                                    {t("orderStatus.paid")}
                                </MenuItem>
                                <MenuItem value="processing">
                                    {t("orderStatus.processing")}
                                </MenuItem>

                                <MenuItem value="shipped">
                                    {t("orderStatus.shipped")}
                                </MenuItem>

                                <MenuItem value="completed">
                                    {t("orderStatus.completed")}
                                </MenuItem>

                                <MenuItem value="cancelled">
                                    {t("orderStatus.cancelled")}
                                </MenuItem>

                            </Select>
                        </FormControl>
                    )}



                </div>
            ))}

        </div>
    );
}
