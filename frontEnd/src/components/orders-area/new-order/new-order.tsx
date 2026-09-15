import { useNavigate, useParams } from "react-router-dom";
import "./new-order.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { productService } from "../../../service/product-service";
import type { productModel } from "../../../models/product-model";

import { authService } from "../../../service/auth-service";
import type { userModel } from "../../../models/user-model";
import type { createOrderData } from "../../../models/order-model";
import { orderService } from "../../../service/order-service";
import { useTranslation } from "react-i18next";

export function NewOrder() {



    const { productId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();



    const [product, setProduct] = useState<productModel | null>(null);
    const [quantity, setQuantity] = useState(1);
    const totalPrice = product?.price! * quantity;

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

    useEffect(() => {
        if (!productId) return;

        productService
            .getOneProduct(productId!)
            .then(setProduct)
            .catch(console.error)


    }, [productId]);

    if (!product) {
        return <div className="newOrder">Loading...</div>
    }




    const createOrder = async () => {

        if (!user || !product) return;

        const token = localStorage.getItem("token")
        if (!token) return;

        const orderData: createOrderData = {
            items: [

                {
                    productId: product._id,
                    quantity: quantity
                }
            ],
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

            {product?.imageUrl && (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                />
            )}

            <h2>{product?.name}</h2>

            <p>{product?.description}</p>

            <p>
                {t("newOrder.price")}:{" "}
                {product.price.toLocaleString()}{" "}
                {t("common.currency")}
            </p>

            <div className="order-quantity">

                <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                    -
                </button>

                <span>{quantity}</span>

                <button
                    onClick={() => setQuantity(prev => Math.max(1, prev + 1))}
                >
                    +
                </button>

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
