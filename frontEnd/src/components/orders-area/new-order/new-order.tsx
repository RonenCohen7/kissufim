import { useNavigate } from "react-router-dom";
import "./new-order.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";


import { authService } from "../../../service/auth-service";
import type { userModel } from "../../../models/user-model";
import type { createOrderData } from "../../../models/order-model";
import { orderService } from "../../../service/order-service";
import { useTranslation } from "react-i18next";

import { cartService } from "../../../service/cart-service";
import type { cartItemModel } from "../../../models/cart-model";

export function NewOrder() {




    const navigate = useNavigate();
    const { t } = useTranslation();




    const [cart] = useState<cartItemModel[]>(cartService.getCart());

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


    const [user, setUser] = useState<userModel | null>(null)

    const [isCreating, setIsCreating] = useState(false);
    const [orderCreated, setOrderCreated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        authService
            .getCurrentUser(token)
            .then(setUser)
            .catch(console.error)
    }, []);






    const createOrder = async () => {
        console.log("click on create new order....");
        console.log("user:", user);
        console.log("cart:", cart);
        console.log("token:", localStorage.getItem("token"));
        if (!user || cart.length === 0) return;

        const token = localStorage.getItem("token")
        if (!token) return;

        const orderData: createOrderData = {
            items: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            city: user.city,
            street: user.street,
            houseNumber: user.houseNumber,
            apartment: user.apartment,
            phone: user.phone
        }


        try {

            setIsCreating(true)

            const newOrder = await orderService.addOrder(
                orderData,
                token
            )
            console.log("order created", newOrder);

            setOrderCreated(true);

            cartService.clearCart()

            navigate(`/orders/${newOrder._id}`)

        }
        catch (err) {
            console.error("Create order failed", err);

            setIsCreating(false)
        }
    }



    return (
        <div className="NewOrder">

            <h1>{t("newOrder.title")}</h1>


            {user && (
                <div className="order-customer">

                    <h3>{t("newOrder.customerDetails")}</h3>

                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.phone}</p>
                    <p>{user.city}</p>
                    <p>{user.street}</p>
                    <p>{user.houseNumber}</p>
                    <p>{user.apartment}</p>


                </div>
            )}

            <div className="order-items">

                {cart.map(item => (

                    <div
                        className="order-item"
                        key={item.productId}
                    >

                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                            />
                        )}

                        <div>

                            <h2>{item.name}</h2>

                            <p>
                                {t("newOrder.price")}:{" "}
                                {item.price.toLocaleString()}{" "}
                                {t("common.currency")}
                            </p>

                            <p>
                                {t("cart.quantity")}: {item.quantity}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

            <h3>
                {t("newOrder.total")}:{" "}
                {totalPrice.toLocaleString()}{" "}
                {t("common.currency")}
            </h3>

            <Button
                variant="contained"
                onClick={createOrder}
                disabled={isCreating || orderCreated}
            >
                {orderCreated
                    ? t("newOrder.created")
                    : isCreating
                        ? t("newOrder.creating")
                        : t("newOrder.createOrder")}
            </Button>

        </div>
    );
}
