import { useNavigate, useParams } from "react-router-dom";
import "./edit-product.css";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { productService } from "../../../service/product-service";
import { Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import type { productModel, UpdateProductData } from "../../../models/product-model";

export function EditProduct() {



    const { _id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [product, setProduct] = useState<productModel | null>(null);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const [submitError, setSubmitError] = useState("");


    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<UpdateProductData>();


    useEffect(() => {
        if (!_id) return;

        productService
            .getOneProduct(_id)
            .then(productFromApi => {
                setProduct(productFromApi)

                reset({
                    name: productFromApi.name,
                    price: productFromApi.price,
                    category: String(productFromApi.category),
                    stock: productFromApi.stock,
                    isActive: productFromApi.isActive
                })

                setPreviewUrl(
                    productFromApi.imageUrl ?? null
                );

            })
            .catch(err => {
                console.error(err)

                setSubmitError(t("editProduct.loadError"))
            })
            .finally(() => setLoading(false))

    }, [_id, reset, t]);


    //image
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.endsWith("image/")) {
            setSubmitError(t("editProduct.validation.imageType"))
            return;
        }
        setSelectedImage(file);
        setSubmitError("");

        setPreviewUrl(currentUrl => {
            if (currentUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(currentUrl)
            }
            return URL.createObjectURL(file)
        })
    }

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl]);

    //Update product

    async function send(formData: UpdateProductData) {
        try {

            if (!_id || !product) return;

            setSubmitError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setSubmitError(t("editProduct.validation.loginRequired"))

                return
            }
            formData.isActive = product.isActive;

            if (selectedImage) {
                formData.image = selectedImage
            }
            else {
                delete formData.image
            }

            const updateProduct = await productService.updateProduct(
                _id,
                formData,
                token
            )
            navigate(`/product-details/${updateProduct._id}`)


        }
        catch (err: any) {
            console.error("Update product error: ", err)


            const serverData = err.response?.data;
            const message =
                typeof serverData === "string"
                    ? serverData
                    : serverData?.message ??
                    err.message ??
                    t("editProduct.error?")

            setSubmitError(message);
        }
    }


    //loading
    if (loading) {
        return (
            <div className="EditProduct edit-product-loading">
                <CircularProgress />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="EditProduct">

                <Typography className="edit-product-error">
                    {submitError}
                </Typography>
            </div>
        )
    }



    //From

    return (
        <div className="EditProduct">

            <div className="edit-product-card">

                <Typography
                    variant="overline"
                    className="edit-product-overline"
                >
                    KISSUFIM
                </Typography>

                <Typography
                    variant="h4"
                    component="h1"
                    className="edit=product-title"
                >
                    {t("editProduct.title")}

                </Typography>

                <Typography className="edit-product-subtitle">
                    {t("editProduct.subtitle")}
                </Typography>

                <form
                    className="edit-product-form"
                    onSubmit={handleSubmit(send)}
                >
                    <TextField
                        label={t("editProduct.name")}
                        fullWidth
                        error={!!errors.name?.message}
                        {...register("name", {
                            required: t("editProduct.validation.nameRequired"),
                            minLength: {
                                value: 2,
                                message: t("editProduct.validation.nameMinLength")
                            }
                        })}
                    />

                    <TextField
                        label={t("editProduct.description")}
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...register("description", {
                            required: t(
                                "editProduct.validation.descriptionRequired"
                            )
                        })}
                    />


                    <div className="edit-product-row">

                        <TextField
                            label={t("editProduct.price")}
                            type="number"
                            fullWidth
                            error={!!errors.price?.message}
                            helperText={errors.price?.message}
                            {...register("price", {
                                required: t(
                                    "editProduct.validation.priceRequired"
                                ),
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: t(
                                        "editProduct.validation.pricePositive"
                                    )
                                }
                            })}
                        />
                        <TextField
                            label={t("editProduct.stock")}
                            type="number"
                            fullWidth
                            error={!!errors.stock?.message}
                            helperText={errors.stock?.message}
                            {...register("stock", {
                                required: t(
                                    "editProduct.validation.stockRequired"
                                ),
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: t(
                                        "editProduct.validation.stockRequired"
                                    )
                                }
                            })}
                        />
                    </div>

                    <Controller
                        name="category"
                        control={control}
                        rules={{
                            required: t(
                                "editProduct.validation.categoryRequired"
                            )
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("editProduct.category")}
                                select
                                fullWidth
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >

                                <MenuItem value="necklaces">
                                    {t("addProduct.categories.necklaces")}
                                </MenuItem>

                                <MenuItem value="earring">
                                    {t("addProduct.categories.earrings")}
                                </MenuItem>

                                <MenuItem value="rings">
                                    {t("addProduce.categories.rings")}
                                </MenuItem>

                                <MenuItem value="bracelets">
                                    {t("addProduct.categories.bracelets")}
                                </MenuItem>

                            </TextField>
                        )}
                    />

                    <div className="edit-product-image-field">

                        <Typography className="edit=product-image-label">
                            {t("editProduct.image")}
                        </Typography>

                        {previewUrl && (
                            <div className="edit-product-image-preview">

                                <img
                                    src={previewUrl}
                                    alt={product.name}
                                />
                            </div>
                        )}

                        <Button
                            component="label"
                            variant="outlined"
                            className="edit=product=image-button"
                        >
                            {t("editProduct.changeImage")}

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>



                        {submitError && (
                            <Typography className="edit=product=error">
                                {submitError}
                            </Typography>
                        )}

                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            className="edit-product-cancel"
                        >
                            {t("editProduct.cancel")}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            className="edit-product-submit"
                        >
                            {isSubmitting
                                ? t("editProduct.saving")
                                : t("editProduct.save")}
                        </Button>




                    </div>
                </form>
            </div>

        </div>
    );
}
