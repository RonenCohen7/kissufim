import { Route, Routes } from "react-router-dom";
import { ProductList } from "../products-area/product-list/product-list";
import { AddProduct } from "../products-area/add-product/add-product";
import { EditProduct } from "../products-area/edit-product/edit-product";
import { Login } from "../users-area/login/login";
import { Register } from "../users-area/register/register";
import { Page404 } from "../pages-area/page404/page404";
import { Home } from "../pages-area/home/home";
import { NoamiPage } from "../pages-area/noami-page/noami-page";
import { ProductDetails } from "../products-area/product-details/product-details";
import { NewOrder } from "../orders-area/new-order/new-order";
import { OrderDetails } from "../orders-area/order-details/order-details";
import { Cart } from "../cart-area/cart/cart";


export function Routing() {
    return (
        <Routes>

            <Route path ="/" element={<Home/>}/>

            <Route path="/products" element={<ProductList/>}/>

            <Route path="/product/add" element={<AddProduct/>}/>

            <Route path="/product/edit/:_id" element={<EditProduct/>}/>

            <Route path="/product-details/:_id" element={<ProductDetails/>}/>

            <Route path="/noami-page" element={<NoamiPage/>}/>

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/orders/new/:productId" element={<NewOrder />}/>

            <Route path="/orders/:_id" element={<OrderDetails/>}/>




            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/*" element={<Page404/>}/>





        </Routes>
    );
}
