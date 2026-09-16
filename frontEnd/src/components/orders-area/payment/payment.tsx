import { useParams } from "react-router-dom";
import "./payment.css";
import { useEffect, useState } from "react";
import qr_pay from "../../../assets/images/qr_pay.png"

import { orderService } from "../../../service/order-service";
import type { orderModel } from "../../../models/order-model";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { dialogService } from "../../../service/dialogService";

export function Payment() {


    const { orderId } = useParams();
    const { t } = useTranslation();

    const [order, setOrder] = useState<orderModel | null>(null);

    useEffect(() => {

        if (!orderId) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        orderService
            .getOneOrder(orderId, token)
            .then(setOrder)
            .catch(console.error)
    }, [orderId]);



    if (!order) {
        return <div className="Payment"> {t("payment.loading")}</div>
    }

    const handlePayment = async () => {

        const confirmed = await dialogService.bitPayment(
            order.totalPrice, qr_pay,
            {
                title: t("payment.bitTitle"),
                transfer: t("payment.bitTransfer"),
                details: t("payment.bitDetails"),
                instructions: t("payment.bitInstructions"),
                confirm: t("payment.paymentTransferred"),
                cancel: t("payment.cancel")
            }
        )

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await orderService.reportPayment(
                order._id,
                token
            )
            await dialogService.success(
                t("payment.paymentReportedTitle"),
                t("payment.paymentReportedText")
            )
        }
        catch (err) {
            console.error(err)
        }


    }

    return (
        <div className="Payment">

            <h1>{t("payment.title")}</h1>

            <p> {t("payment.orderNumber")} {orderId} </p>

            <div className="payment-items">
                {order.items.map(item => (
                    <div key={item.productId}>
                        {item.name} * {item.quantity}
                    </div>
                ))}
            </div>

            <h2>

                {t("payment.totalPaid")}
                {order.totalPrice.toLocaleString()}₪
            </h2>

            <Button
                variant="contained"
                onClick={handlePayment}
            >
                {t("payment.pay")}
            </Button>

        </div>
    );
}
