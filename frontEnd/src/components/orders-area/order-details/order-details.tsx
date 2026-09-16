import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { orderModel } from "../../../models/order-model";
import { orderService } from "../../../service/order-service";

import "./order-details.css";
import i18n from "../../../i18n/i18n";
import { appConfig } from "../../../utils/app-config";

export function OrderDetails() {

    const { _id } = useParams();
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [order, setOrder] = useState<orderModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadOrder = async () => {

            try {

                if (!_id) {
                    setError("Order ID missing");
                    return;
                }

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("User not logged in");
                    return;
                }

                const order = await orderService.getOneOrder(_id, token);

                setOrder(order);

            }
            catch (err) {

                console.error("Failed to load order", err);
                setError("Failed to load order");

            }
            finally {
                setLoading(false);
            }
        };

        loadOrder();

    }, [_id]);


    if (loading) {
        return (
            <div className="OrderDetails order-details-loading">
                <CircularProgress />
            </div>
        );
    }


    if (error || !order) {
        return (
            <div className="OrderDetails">
                <div className="order-details-error">
                    {error || "Order not found"}
                </div>
            </div>
        );
    }


    const orderDate = new Date(order.createdAt).toLocaleDateString(
        i18n.language === "he" ? "he-IL" : "en-US",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );


    return (
        <div className="OrderDetails">

            <div className="order-details-container">

                <div className="order-details-header">

                    <span className="order-details-brand">
                        KISUUFIM
                    </span>

                    <h1>
                        {t("orderDetails.title")}
                    </h1>

                    <p>
                        {t("orderDetails.subtitle")}
                    </p>

                </div>
                <div className="order-success">
                    <h2>{t("orderDetails.orderCreated")}</h2>
                    <p>{t("orderDetails.orderCreatedMessage")}</p>
                </div>

                <div className="order-details-meta">

                    <div>
                        <span>{t("orderDetails.orderNumber")}</span>
                        <strong>#{order._id.slice(-8)}</strong>
                    </div>

                    <div>
                        <span>{t("orderDetails.date")}</span>
                        <strong>{orderDate}</strong>
                    </div>

                    <div>
                        <span>{t("orderDetails.status")}</span>
                        <strong>
                            {t(`orderStatus.${order.status}`)}
                        </strong>
                    </div>

                </div>


                <div className="order-details-section">

                    <h2>
                        {t("orderDetails.items")}
                    </h2>

                    {order.items.map((item) => (

                        <div
                            className="order-details-item"
                            key={item.productId}
                        >

                            {item.imageName && (
                                <img
                                    className="order-item-image"
                                    src={`${appConfig.productsImagesUrl}${item.imageName}`}
                                    alt={item.name}
                                />
                            )}

                            <div className="order-item-info">

                                <h3>{item.name}</h3>

                                <p>
                                    {t("orderDetails.quantity")}:{" "}
                                    {item.quantity}
                                </p>

                                <p>
                                    {item.price.toLocaleString()}{" "}
                                    {t("common.currency")}
                                </p>

                            </div>

                            <strong className="order-item-total">
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                {t("common.currency")}
                            </strong>



                        </div>



                    ))}

                </div>


                <div className="order-details-section">

                    <h2>
                        {t("orderDetails.shipping")}
                    </h2>

                    <div className="order-shipping-details">

                        <p>{order.city}</p>

                        <p>
                            {order.street} {order.houseNumber}
                        </p>

                        {order.apartment && (
                            <p>
                                {t("orderDetails.apartment")}:{" "}
                                {order.apartment}
                            </p>
                        )}

                        <p>{order.phone}</p>

                    </div>

                </div>


                <div className="order-details-summary">

                    <span>
                        {t("orderDetails.total")}
                    </span>

                    <strong>
                        {order.totalPrice.toLocaleString()}{" "}
                        {t("common.currency")}
                    </strong>

                </div>

                {!order.isPaid && (
                    <Button
                        variant="contained"
                        className="order-payment-button"
                        onClick={() => navigate(`/payment/${order._id}`)}
                    >
                        {t("orderDetails.proceedToPayment")}
                    </Button>
                )}

            </div>



        </div>
    );
}