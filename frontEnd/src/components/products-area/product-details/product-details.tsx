import { useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";

import {
    Button,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";

import { useTranslation } from "react-i18next";

import "./product-details.css";

import { productService } from "../../../service/product-service";
import type { productModel } from "../../../models/product-model";
import { authService } from "../../../service/auth-service";


export function ProductDetails() {

    const { _id } = useParams();

    const [product, setProduct] = useState<productModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    
    


    const navigate = useNavigate();
    const { t } = useTranslation();



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        authService
            .getCurrentUser(token)
            .then(user => {
                setIsAdmin(user.role === "admin")
            })
            .catch(() => {
                setIsAdmin(false)
            })
    }, []);



    useEffect(() => {

        const loadProduct = async () => {

            try {

                setLoading(true);
                setError("");

                if (!_id) {
                    setError("Product is missing");
                    return;
                }

                const product = await productService.getOneProduct(_id);

                setProduct(product);

            }
            catch (err) {

                console.error(err);

                setError("Failed to load product");

            }
            finally {

                setLoading(false);

            }

        };


        loadProduct();

    }, [_id]);


    if (loading) {
        return (
            <div className="ProductDetails product-details-loading">

                <CircularProgress />

            </div>
        );
    }


    if (error || !product) {
        return (
            <div className="ProductDetails">

                <Container maxWidth="lg">

                    <Typography className="product-details-error">
                        {error || "Product not found"}
                    </Typography>

                </Container>

            </div>
        );
    }

    const handleAddToCard = () =>{
        const token = localStorage.getItem("token")

        if(!token) {
            navigate("/login", {
                state: {
                    returnTo: `/product-details/${product._id}`
                }
            })
            return;
        }
        navigate(`/orders/new/${product._id}`)
    }

    return (
        <div className="ProductDetails">

            <Container maxWidth="lg">

                <div className="product-details-layout">

                    {/* Story */}
                    <div className="product-details-story">

                        <Typography
                            variant="overline"
                            className="product-story-overline"
                        >
                            {t("productDetails.storyOverline")}
                        </Typography>


                        <Typography
                            variant="h4"
                            className="product-story-title"
                        >
                            {t("productDetails.storyTitle")}
                        </Typography>


                        <div className="product-story-line" />


                        <Typography className="product-story-text">
                            {t("productDetails.storyText1")}
                        </Typography>


                        <Typography className="product-story-text">
                            {t("productDetails.storyText2")}
                        </Typography>


                        <div className="product-story-signature">
                            More than jewelry
                            <br />
                            A feeling
                        </div>

                    </div>


                    {/* Product Side */}
                    <div className="product-side">

                        {/* Image */}
                        <div className="product-details-content">

                            <div className="product-details-image">

                                {product.imageUrl ? (

                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="product-details-no-image">
                                        KISSUFIM
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* Product Information */}
                        <div className="product-details-info">

                            <Typography
                                variant="overline"
                                className="product-details-overline"
                            >
                                KISSUFIM
                            </Typography>


                            <Typography
                                variant="h3"
                                component="h1"
                                className="product-details-name"
                            >
                                {product.name}
                            </Typography>


                            <Typography className="product-details-price">
                                {product.price.toLocaleString()}{" "}
                                {t("common.currency")}
                            </Typography>


                            <div className="product-details-divider" />


                            <Typography className="product-details-description">
                                {product.description}
                            </Typography>


                            <Typography className="product-details-category">
                                {t("products.category")}: {product.category}
                            </Typography>

                            {isAdmin ? (
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        navigate(`/product/edit/${product._id}`)
                                    }
                                >
                                    {t("products.edit")}
                                </Button>
                            ):(

                            product.stock > 0 ? (

                            <Button
                                variant="contained"
                                size="large"
                                className="product-details-button"
                                onClick={handleAddToCard}
                            >
                                {t("products.addToCart")}
                            </Button>

                            ) : (

                            <Typography className="product-details-out-of-stock">
                                {t("products.outOfStock")}
                            </Typography>
                            )
                        )}

                        </div>

                    </div>

                </div>

            </Container>

        </div>
    );
}