
import axios from "axios";
import type { AddProductData, productModel, UpdateProductData } from "../models/product-model";
import { appConfig } from "../utils/app-config";


class ProductService {

    //Convert product Data to FormData
    private convertToFormData(product: AddProductData | UpdateProductData): FormData {

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price.toString());
        formData.append("category", product.category);
        formData.append("stock", product.stock.toString());
        formData.append("isActive", product.isActive.toString());


        if (product.image) {
            formData.append("image", product.image);
        }

        return formData;
    }

    //Get All products Admin
    public async getAllProductAdmin(token: string): Promise<productModel[]> {

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
    public async getAllProducts(): Promise<productModel[]> {

        const response = await axios.get<productModel[]>(
            `${appConfig.productUrl}`
        )
        return response.data;
    }



    //Get One Product
    public async getOneProduct(_id: string): Promise<productModel> {

        const response = await axios.get<productModel>(
            `${appConfig.productUrl}/${_id}`
        )
        return response.data
    }


    //Add Product
    public async addProduct(product: AddProductData, token: string): Promise<productModel> {

        const formData = this.convertToFormData(product);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        const response = await axios.post<productModel>(
            appConfig.productUrl, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    }



    //Update product
    public async updateProduct(_id: string, product: UpdateProductData, token: string): Promise<productModel> {

        const formData = this.convertToFormData(product);

        const response = await axios.put<productModel>(
            `${appConfig.productUrl}/${_id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }



    //Delete product
    public async deleteProduct(_id: string, token: string): Promise<void> {
        await axios.delete(`${appConfig.productUrl}/${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }



    //Restore Product
    public async restoreProduct(_id: string, token: string): Promise<productModel> {

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