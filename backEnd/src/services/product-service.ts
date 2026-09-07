import { ClientError } from "../model/client-error";
import { StatusCode } from "../model/enums";
import { IProduct, ProductModel } from "../model/product-model";

class ProductService {



     //Get All products For Admin 
    public async getAllProductsForAdmin(): Promise<IProduct[]> {

        return ProductModel.find().exec();
    }

    //Get All products For user 
    public async getAllProducts(): Promise<IProduct[]> {

        return ProductModel.find({isActive: true}).exec();
    }


    //Get One Product
    public async getOneProduct(_id: string): Promise<IProduct | null> {
        const product = await ProductModel.findById(_id).exec();
        if (!product) throw new ClientError(StatusCode.NotFound, `_id ${_id} not exists`)
        return product;
    }


    //Add product
    public async addProduct(product: IProduct): Promise<IProduct> {
        const dbProduct = new ProductModel(product)
        return dbProduct.save();
    }



    //Update Product
    public async updateProduct(_id: string, product: Partial<IProduct>): Promise<IProduct> {

        const dbProduct = await ProductModel.findByIdAndUpdate(
            _id,
            product,
            {
                returnDocument: "after",
                runValidators: true
            }).exec()

        if (!dbProduct) throw new ClientError(StatusCode.NotFound, `_id ${_id} not exists. `)

        return dbProduct;
    }

    //Delete product
    public async deleteProduct(_id: string): Promise<void> {
        const dbProduct = await ProductModel.findByIdAndUpdate(
            _id,
            { isActive: false },
            { returnDocument: "after" }
        ).exec()

        if (!dbProduct) throw new ClientError(StatusCode.NotFound, `_id ${_id} not exists`)

    }



    //Restore Product
    public async restoreProduct(_id: string): Promise<IProduct>{
        const dbProduct = await ProductModel.findByIdAndUpdate(
            _id,
            {isActive: true},
            {
                returnDocument:"after",
                runValidators: true
            }
        ).exec();

        if(!dbProduct) {
            throw new ClientError(StatusCode.NotFound, `_id ${ _id} not exists`)
        }

        return dbProduct;
    }
}


export const productService = new ProductService();