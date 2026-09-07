import  { Document, Schema, model } from "mongoose";
import { appConfig } from "../utils/app-config";

export interface IProduct extends Document {

    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;

    imageName?: string;
    isActive: boolean;

}


export const ProductSchema = new Schema<IProduct>({

    name: {
        type: String,
        required: [true, "Missing Name"],
        minLength: [2, "Name too short"],
        maxlength: [30, "Name too long"],
        trim: true
    },

    description:
    {
        type: String,
        required: [true, "Description Missing"],
        maxlength: [300, "Description too long"],
        trim: true

    },

    price: {
        type: Number,
        required: [true, "Price Missing"],
        min: [1, "Price must be a positive number"],
        max: [5000, "price too high"]
    },
    category:
    {
        type: String,
        required: [true, "Category Missing"]
    },

    stock:
    {
        type: Number,
        required: [true, "Stock Missing"],
        min: [0, "Stock cannot be negative"],
        max: [5000, "Stock too high"]
    },

    imageName: {
        type: String
    },
    isActive:
    {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//virtual
ProductSchema.virtual("imageUrl").get(function () {
    if (!this.imageName) return null;

    return appConfig.imagesUrl + this.imageName;
})




export const ProductModel = model<IProduct>("ProductModel", ProductSchema, "products");