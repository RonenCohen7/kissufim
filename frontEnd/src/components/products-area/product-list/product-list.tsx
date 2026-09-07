import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    CircularProgress
} from "@mui/material";
import { useTranslation } from "react-i18next";


import type { productModel } from "../../../models/product-model";

import "./product-list.css";
import { productService } from "../../../service/product-service";


export function ProductList() {

    const { t } = useTranslation();

    const [products, setProducts] = useState<productModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);
                setError("");

                const products = await productService.getAllProducts();
                console.log(products);

                setProducts(products);

            }
            catch (err) {

                console.error(err);

                setError(t("products.loadError"));

            }
            finally {

                setLoading(false);

            }

        };


        loadProducts();

    }, [t]);


    if (loading) {
        return (
            <div className="ProductList product-list-loading">

                <CircularProgress />

            </div>
        );
    }


    return (
        <div className="ProductList">

            <section className="products-header">

                <Container maxWidth="xl">

                    <Typography
                        variant="overline"
                        className="products-overline"
                    >
                        KISUUFIM
                    </Typography>

                    <Typography
                        variant="h3"
                        component="h1"
                        className="products-title"
                    >
                        {t("products.title")}
                    </Typography>

                    <Typography className="products-subtitle">
                        {t("products.subtitle")}
                    </Typography>

                </Container>

            </section>


            <section className="products-section">

                <Container maxWidth="xl">

                    {error && (

                        <Typography className="products-error">
                            {error}
                        </Typography>

                    )}


                    {!error && products.length === 0 && (

                        <Typography className="products-empty">
                            {t("products.empty")}
                        </Typography>

                    )}


                    {!error && products.length > 0 && (

                        <Grid
                            container
                            spacing={3}
                        >

                            {products.map((product) => (

                                <Grid
                                    key={product._id}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 3
                                    }}
                                >

                                    <article className="product-card">

                                        <div className="product-image">

                                            {product.imageUrl ? (

                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                />

                                            ) : (

                                                <div className="product-no-image">
                                                    KISUUFIM
                                                </div>

                                            )}

                                        </div>


                                        <div className="product-info">

                                            <Typography
                                                component="h2"
                                                className="product-name"
                                            >
                                                {product.name}
                                            </Typography>


                                            <Typography className="product-price">
                                                {product.price.toLocaleString()}{" "}
                                                {t("common.currency")}
                                            </Typography>

                                        </div>

                                    </article>

                                </Grid>

                            ))}

                        </Grid>

                    )}

                </Container>

            </section>

        </div>
    );
}