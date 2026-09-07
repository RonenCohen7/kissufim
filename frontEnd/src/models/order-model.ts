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

    address: string;

    pone: string;

    status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "completed"
        | "cancelled"


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
    }[]
    
    city: string;
    
    address: string;
    
    phone: string;
}

export interface updateOrderData {
    status?: orderModel["status"]
    paymentMethod?: string;
    isPaid?: boolean
}
