export interface productModel {
     _id: string;
     name: string;
     description: string | null;
     price: number;
     category: string | null;
     stock: number;
     
     imageName: string;
     imageUrl?: string | null;

     isActive: boolean;
     createAt: string;
     updateAt:string;
}

export interface AddProductData {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;

    image ?:File;

    isActive: boolean
}


export interface UpdateProductData {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;

    image? :File;
    isActive: boolean;
}