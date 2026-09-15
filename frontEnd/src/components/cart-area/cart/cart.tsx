import { useState } from "react";
import "./cart.css";

import { cartService } from "../../../service/cart-service";
import { useTranslation } from "react-i18next";
import { Button, Container, Typography } from "@mui/material";
import type { cartItemModel } from "../../../models/cart-model";
import { useNavigate } from "react-router-dom";



export function Cart() {

    const [cart, setCart] = useState<cartItemModel[]>(cartService.getCart())

    const { t } = useTranslation()

    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);



    const increaseQuantity = (item: cartItemModel) => {
        cartService.updateQuantity(
            item.productId,
            item.quantity + 1
        )

        setCart(cartService.getCart())
    }

    const decreaseQuantity = (item: cartItemModel) => {

        if (item.quantity <= 1) return;

        cartService.updateQuantity(
            item.productId,
            item.quantity - 1
        )

        setCart(cartService.getCart())
    }


    const removeItem = (productId: string) => {

        cartService.removeFromCard(productId)

        setCart(cartService.getCart())
    }



    return (
        <div className="Cart">

            <Container maxWidth="lg">
                <Typography
                    variant="overline"
                    className="cart-overline"
                >
                    KISSUFIM
                </Typography>


                <Typography
                    variant="h3"
                    component="h1"
                    className="cart-title"
                >
                    {t("cart.title")}
                </Typography>




                {cart.length === 0 ? (
                    <Typography className="cart-empty">
                        {t("cart.empty")}
                    </Typography>
                ) : (
                    <div className="cart-item">
                        {cart.map(item => (
                            <div
                                className="cart-item"
                                key={item.productId}
                            >
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                )}

                                <div className="cart-item-info">

                                    <Typography
                                        variant="h6"
                                        className="cart-item-name">
                                        {item.name}
                                    </Typography>

                                    <Typography className="cart-item-price">
                                        {item.price.toLocaleString()}{" "}
                                        {t("common.currency")}
                                    </Typography>



                                    <div className="cart-item-quantity">

                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item)}
                                        >
                                            −
                                        </button>

                                        <Typography component="span">
                                            {t("cart.quantity")}: {item.quantity}
                                        </Typography>

                                        <button
                                            type="button"
                                            onClick={() => increaseQuantity(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="cart-remove-button"
                                        onClick={() => { removeItem(item.productId) }}
                                    >
                                        {t("cart.remove")}
                                    </button>



                                </div>

                            </div>
                        ))}
                    </div>


                )}
            </Container>
            <div className="cart-summery">
                <Typography>
                    {t("cart.total")}
                </Typography>
                <Typography>
                    {totalPrice.toLocaleString()}{""}
                    {t("common.currency")}
                </Typography>
            </div>
            <Button
                variant="contained"
                onClick={()=>{navigate("/orders/new")}}
            >
                {t("cart.checkout")}

            </Button>

        </div>
    );
}
