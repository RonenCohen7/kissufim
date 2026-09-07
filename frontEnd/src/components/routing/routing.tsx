import { Route, Routes } from "react-router-dom";
import { ProductList } from "../products-area/product-list/product-list";
import { AddProduct } from "../products-area/add-product/add-product";
import { EditProduct } from "../products-area/edit-product/edit-product";
import { Login } from "../users-area/login/login";
import { Register } from "../users-area/register/register";
import { Page404 } from "../pages-area/page404/page404";
import { Home } from "../pages-area/home/home";


export function Routing() {
    return (
        <Routes>

            <Route path ="/" element={<Home/>}/>

            <Route path="/products" element={<ProductList/>}/>

            <Route path="/product/add" element={<AddProduct/>}/>

            <Route path="/product/edit/:_id" element={<EditProduct/>}/>




            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/*" element={<Page404/>}/>





        </Routes>
    );
}
