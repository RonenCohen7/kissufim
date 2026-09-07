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