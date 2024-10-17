import React from "react";
import Product from "./product/Product";
import Cart from "./carts/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Route, Routes } from "react-router-dom";
const Page = () => {
  return (
      <div>
          {/*...defining routes.... */}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register " element={<Register />} />
        <Route path=" /cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default Page;
