import express, { Request, Response, NextFunction } from "express"
import { productService } from "../services/product-service";
import { rmSync } from "node:fs";
import { ProductModel } from "../model/product-model";
import { StatusCode } from "../model/enums";
import { STATUS_CODES } from "node:http";
import { UploadedFile } from "express-fileupload";
import { productImage } from "../utils/product-image";
import { authMiddleware } from "../middleware/auth-middleware";


class ProductController {

    public readonly router = express.Router();

    public constructor() {

        this.router.get("/api/admin/products",authMiddleware.verifyLoggedIn, authMiddleware.verifyAdmin, this.getAllProductsForAdmin);

        this.router.get("/api/products", this.getAllProducts);
        this.router.get("/api/products/:_id", this.getOneProduct);

        this.router.post("/api/products", this.addProduct);
        this.router.put("/api/products/:_id", this.updateProduct);

        this.router.patch("/api/products/:_id/restore", this.restoreProduct);

        this.router.delete("/api/products/:_id", this.deleteProduct);

    }

      // Get All product For admin
    private async getAllProductsForAdmin(request:Request, response:Response, next:NextFunction):Promise<void>{
        try{
            const products = await productService.getAllProductsForAdmin();
            response.json(products)
        }
        catch(err:any){
            next(err);
        }
    }

    // Get All product For users
    private async getAllProducts(request:Request, response:Response, next:NextFunction):Promise<void>{
        try{
            const products = await productService.getAllProducts();
            response.json(products)
        }
        catch(err:any){
            next(err);
        }
    }

    //Get One Product
    private async getOneProduct(request:Request, response:Response, next: NextFunction):Promise<void>{
        try{
            const _id = String(request.params._id)
            const product = await productService.getOneProduct(_id);
            response.json(product)

        }catch(err:any){
            next(err)
        }
    }

    //Add product
    private async addProduct(request:Request, response:Response, next:NextFunction):Promise<void>{

        let imageName: string | undefined;

        try {

            const image = request.files?.image as UploadedFile;

            if(image) {
                imageName = await productImage.save(image)
            }

            const product = new ProductModel({
                ...request.body,
                price: Number(request.body.price),
                stock: Number(request.body.stock),
                isActive: 
                    request.body.isActive == "true" || 
                    request.body.isActive == true,
                imageName
            });

            const addProduct = await productService.addProduct(product)

            response.status(StatusCode.Created).json(addProduct);

        } catch(err:any){

            if(imageName) {
                await productImage.delete(imageName);
            }
            next(err)
        }
    }



    //update product
    private async updateProduct(request:Request, response:Response, next:NextFunction):Promise<void>{

        let newImageName: string | undefined;

        try{

            const _id = String(request.params._id);

            const oldProduct = await productService.getOneProduct(_id)

            const image = request.files?.image as UploadedFile;

            if(image){
                newImageName = await productImage.save(image)
            }

            const productData :any = {
                ...request.body
            }

            if(request.body.price !== undefined){
                productData.price = Number(request.body.price)
            }

            if(request.body.stock !== undefined){
                productData.stock = Number(request.body.stock)
            }

            if(request.body.isActive !== undefined){
                productData.isActive = 
                    request.body.isActive == "true" || 
                    request.body.isActive == true
            }

            if(newImageName){
                productData.imageName = newImageName
            }

            const updateProduct = await productService.updateProduct(_id, productData)

           //delete
           if (newImageName && oldProduct?.imageName && oldProduct.imageName !== newImageName){
                await productImage.delete(oldProduct.imageName)
           }

           response.json(updateProduct);

        }catch(err:any){
            next(err)
        }
    }


    //Delete product
    private async deleteProduct(request:Request, response:Response, next:NextFunction):Promise<void>{

        try {
            const _id = String(request.params._id);
            await productService.deleteProduct(_id)
            response.status(StatusCode.NoContent).json()

        }catch(err:any){
            next(err)
        }

    }



    //Restore product
    private async restoreProduct(request:Request, response:Response, next:NextFunction):Promise<void>{

        try {

            const _id = String(request.params._id);

            const restoreProduct = await productService.restoreProduct(_id);

            response.json(restoreProduct);

        } catch(err:any){
            next(err)
        }
    }
}

export const productController = new ProductController();


