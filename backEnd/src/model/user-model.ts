import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    password: string;
    role: "customer" | "admin";
    isActive: boolean;
}

export const UserSchema = new Schema<IUser>({

    firstName: {
        type: String,
        required: [true, "First Name missing"],
        minlength: [2, "First Name too short"],
        maxlength: [30, "First Name too long"],
        trim: true
    },

    lastName: {
        type: String,
        required: [true, "Last Name missing"],
        minlength: [2, "Last Name too short"],
        maxlength: [30, "Last Name too long"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email missing"],
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone missing"],
        unique: true,
        trim: true
    },

    city: {
        type: String,
        required: [true, "City missing"],
        trim: true
    },

    address: {
        type: String,
        required: [true, "Address missing"],
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password missing"],
        select: false
    },

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    versionKey: false,
    timestamps: true,
    id: false
   
    }
);

export const UserModel =
    model<IUser>("UserModel", UserSchema, "users");