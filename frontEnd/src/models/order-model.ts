export interface orderItemModel {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageName?: string;
}

export interface orderModel {
    _id: string;
    userId: string;

    items: orderItemModel[];

    totalPrice: number;

    city: string;
    street: string;
    houseNumber: string;
    apartment?: string;
    phone: string;

    status:
        | "pending"
        | "payment_reported"
        | "paid"
        | "processing"
        | "shipped"
        | "completed"
        | "cancelled";

    paymentMethod?: string;

    isPaid: boolean;
    paidAt?: string;

    createdAt: string;
    updatedAt: string;
}

export interface createOrderData {
    items: {
        productId: string;
        quantity: number;
    }[];

    city: string;
    street: string;
    houseNumber: string;
    apartment?: string;
    phone: string;
}

export interface updateOrderData {
    status?: orderModel["status"];
    paymentMethod?: string;
    isPaid?: boolean;
}