import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import ProductList2 from "./pages/ProductList2";
import Register from "./pages/Register";
import Login from "./pages/Login";
import React from "react";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import WishList from "./pages/WishList";
import ChatRoom from "./pages/ChatRoom";
import ChatAdmin from "./pages/ChatAdmin";
import ChatUser from "./pages/ChatUser";
import UsersTable from "./pages/UsersTable";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HomeAdmin from "./pages/HomeAdmin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import ViewProduct from "./products/ViewProduct";
import Categories1 from "./components/Categories1";
import CategoriesF from "./components/CategoriesF";
import CategoriesM from "./components/CategoriesM";


const App = () => {
    localStorage.setItem("r", 0);
    return (
        <Router>
            
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/ChatRoom" element={<ChatRoom />} />
                <Route exact path="/chatAdmin" element={<ChatAdmin />} />
                <Route exact path="/chatUser" element={<ChatUser />} />
                <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/home" element={<Categories1 />} />
                <Route exact path="/home/F" element={<CategoriesF />} />
                <Route exact path="/home/M" element={<CategoriesM />} />
                <Route exact path="/homeAdmin" element={<HomeAdmin />} />
                <Route exact path="/homeAdmin/addproduct" element={<AddProduct />} />
                <Route exact path="/homeAdmin/users" element={<UsersTable />} />
                <Route exact path="/homeAdmin/editproduct/:id" element={<EditProduct />} />
                <Route exact path="/homeAdmin/viewproduct/:id" element={<ViewProduct />} />
                <Route exact path="/home/productList/:id" element={<ProductList />} />
                <Route exact path="/home/productList" element={<ProductList />} />
                <Route exact path="/home/productList2" element={<ProductList2 />} />
                <Route exact path="/home/product:id" element={<Product />} />
                <Route exact path="/home/cart" element={<Cart />} />
                <Route exact path="/home/wishlist" element={<WishList />} />
            </Routes>
        </Router>
    );
};

export default App;