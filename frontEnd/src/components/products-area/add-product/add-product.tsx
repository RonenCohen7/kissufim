import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
    Button,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";

import "./add-product.css";

import type { AddProductData } from "../../../models/product-model";
import { productService } from "../../../service/product-service";


export function AddProduct() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState("");

    const { register, handleSubmit,control, formState: { errors, isSubmitting } } = useForm<AddProductData>({ defaultValues: { name: "", description: "", price: 0, category: "", stock: 0, isActive: true } });


    function handleImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setSubmitError(
                t("addProduct.validation.imageType")
            );

            return;
        }

        setSubmitError("");

        setPreviewUrl(
            URL.createObjectURL(file)
        );
    }


    async function send(
        product: AddProductData
    ) {

        try {

            setSubmitError("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                setSubmitError(
                    t("addProduct.validation.loginRequired")
                );

                return;
            }


            const imageFiles =
                product.image as unknown as FileList;


            if (imageFiles?.length > 0) {

                product.image =
                    imageFiles[0];

            }
            else {

                delete product.image;

            }


            const addedProduct =
                await productService.addProduct(
                    product,
                    token
                );


            navigate(
                `/product-details/${addedProduct._id}`
            );

        }
        catch (err: any) {

            console.error(
                "Add product error:",
                err
            );

            console.error(
                "Backend response:",
                err.response?.data
            );


            const serverData =
                err.response?.data;


            const message =
                typeof serverData === "string"
                    ? serverData
                    : serverData?.message ??
                    err.message ??
                    t("addProduct.error");


            setSubmitError(message);

        }

    }


    return (

        <div className="AddProduct">

            <div className="add-product-card">

                <Typography
                    variant="overline"
                    className="add-product-overline"
                >
                    KISUUFIM
                </Typography>


                <Typography
                    variant="h4"
                    component="h1"
                    className="add-product-title"
                >
                    {t("addProduct.title")}
                </Typography>


                <Typography className="add-product-subtitle">
                    {t("addProduct.subtitle")}
                </Typography>


                <form
                    className="add-product-form"
                    onSubmit={handleSubmit(send)}
                >

                    <TextField
                        label={t("addProduct.name")}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register("name", {
                            required: t(
                                "addProduct.validation.nameRequired"
                            ),
                            minLength: {
                                value: 2,
                                message: t(
                                    "addProduct.validation.nameMinLength"
                                )
                            }
                        })}
                    />


                    <TextField
                        label={t("addProduct.description")}
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...register("description", {
                            required: t(
                                "addProduct.validation.descriptionRequired"
                            ),
                            minLength: {
                                value: 5,
                                message: t(
                                    "addProduct.validation.descriptionMinLength"
                                )
                            }
                        })}
                    />


                    <div className="add-product-row">

                        <TextField
                            label={t("addProduct.price")}
                            type="number"
                            fullWidth
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            slotProps={{
                                htmlInput: {
                                    step: "0.01"
                                }
                            }}
                            {...register("price", {
                                required: t(
                                    "addProduct.validation.priceRequired"
                                ),
                                valueAsNumber: true,
                                min: {
                                    value: 0.01,
                                    message: t(
                                        "addProduct.validation.pricePositive"
                                    )
                                }
                            })}
                        />


                        <TextField
                            label={t("addProduct.stock")}
                            type="number"
                            fullWidth
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                            {...register("stock", {
                                required: t(
                                    "addProduct.validation.stockRequired"
                                ),
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: t(
                                        "addProduct.validation.stockNonNegative"
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
                                "addProduct.validation.categoryRequired"
                            )
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t("addProduct.category")}
                                select
                                fullWidth
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >

                                <MenuItem value="">
                                    {t("addProduct.selectCategory")}
                                </MenuItem>

                                <MenuItem value="necklaces">
                                    {t("addProduct.categories.necklaces")}
                                </MenuItem>

                                <MenuItem value="earrings">
                                    {t("addProduct.categories.earrings")}
                                </MenuItem>

                                <MenuItem value="rings">
                                    {t("addProduct.categories.rings")}
                                </MenuItem>

                                <MenuItem value="bracelets">
                                    {t("addProduct.categories.bracelets")}
                                </MenuItem>

                            </TextField>
                        )}
                    />


                    <div className="add-product-image-field">

                        <Typography className="add-product-image-label">
                            {t("addProduct.image")}
                        </Typography>


                        <Button
                            component="label"
                            variant="outlined"
                            className="add-product-image-button"
                        >

                            {t("addProduct.chooseImage")}

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                {...register("image", {
                                    onChange: handleImageChange
                                })}
                            />

                        </Button>


                        {previewUrl && (

                            <div className="add-product-image-preview">

                                <img
                                    src={previewUrl}
                                    alt={t("addProduct.image")}
                                />

                            </div>

                        )}

                    </div>


                    {submitError && (

                        <Typography className="add-product-error">
                            {submitError}
                        </Typography>

                    )}


                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        className="add-product-submit"
                    >
                        {isSubmitting
                            ? t("addProduct.saving")
                            : t("addProduct.submit")}
                    </Button>

                </form>

            </div>

        </div>
    );
}