import type { cartItemModel } from "../models/cart-model";

class CartService {

    private readonly storageKey = "cart";



    //Get Card
    public getCart(): cartItemModel[]{
        
        const cart = localStorage.getItem(this.storageKey);

        if(!cart) {
            return []
        }

        return JSON.parse(cart)
    }


    //Add product to cart
    public addToCart(item: cartItemModel):void {

        const cart = this.getCart()

        const existingItem = cart.find(cartItem => cartItem.productId === item.productId);

        if(existingItem) {
            existingItem.quantity += item.quantity
        }
        else {
            cart.push(item)
        }
        this.saveCart(cart)
    }


    //save cart
    private saveCart(cart:cartItemModel[]):void {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(cart)
        )
    }


    //Update product quantity
    public updateQuantity(productId: string, quantity:number): void {

        const cart = this.getCart()

        const item = cart.find(item => item.productId === productId);

        if(!item)return;

        if(quantity <= 0){
            this.removeFromCard(productId)
        }

        item.quantity = quantity

        this.saveCart(cart)
    }


    //Remove product
    public removeFromCard(productId: string):void {
        
        const cart = this.getCart()

        const updateCart = cart.filter(
            item => item.productId !== productId
        )

        this.saveCart(updateCart)
    }


    //Clear cart
    public clearCart():void {
        localStorage.removeItem(this.storageKey)
    }



}
export const cartService = new CartService();