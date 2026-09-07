import { Document, Schema, model, Types } from "mongoose";


export interface IOrderItem {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    imageName?: string;

}


export interface IOrder extends Document {

    userId: Types.ObjectId;
    items: IOrderItem[];


    totalPrice: number;

    city: string;
    address: string;
    phone: string;


    status:
    | "pending"
    | "paid"
    | "processing"
    | "complete"
    | "cancelled"


    paymentMethod?: string;

    isPaid: boolean;
    paidAt?: Date;

}



const OrderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    imageName: {
        type: String
    }
})

export const OrderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },

    items: {
        type: [OrderItemSchema],
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    city: {
        type:String,
        required:[true, "City missing"],
        trim: true
    },

    address : {
            type:String,
            required: [true, "Address missing"],
            trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone Missing"],
        trim:true
    },

    status: {
        type: String,
        enum: ["pending",
                "paid",
                "processing",
                "shipped",
                "completed",
                "cancelled"
        ],
        default: "pending"
    },

    isPaid: {
        type:Boolean,
        default:false
    },

    paidAt: {
        type:Date
    }

},{

    versionKey:false,
    timestamps:true,
    id:false
})

export const OrderModel = model<IOrder>("OrderModel", OrderSchema, "orders");