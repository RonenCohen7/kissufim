
import axios from "axios";
import type { productModel } from "../models/product-model";
import { appConfig } from "../utils/app-config";


class ProductService {



    //Get All products Admin
    public async getAllProductAdmin(token:string):Promise<productModel[]>{

        const response = await axios.get<productModel[]>(
            appConfig.adminProductUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }


    //Get All Products users
    public async getAllProducts():Promise<productModel[]>{

        const response = await axios.get<productModel[]>(
            `${appConfig.productUrl}`
        )
        return response.data;
    }



    //Get One Product
    public async getOneProduct(_id:string):Promise<productModel>{

        const response = await axios.get<productModel>(
            `${appConfig.productUrl}/${_id}`
        )
        return response.data
    }


    //Add Product
    public async addProduct(product:FormData, token:string):Promise<productModel>{

        const response = await axios.post<productModel>(
            appConfig.productUrl,product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
        );

        return response.data;
    }



    //Update product
    public async updateProduct(_id:string,product:FormData, token:string):Promise<productModel>{

        const response = await axios.put<productModel>(
            `${appConfig.productUrl}/${_id}`,product,
            {   
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }



    //Delete product
    public async deleteProduct(_id:string, token: string):Promise<void>{
        await axios.delete(`${appConfig.productUrl}/${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }



    //Restore Product
    public async restoreProduct(_id: string, token:string):Promise<productModel>{

        const response = await axios.patch<productModel>(
            `${appConfig.productUrl}/${_id}/restore`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }
}

export const productService = new ProductService();