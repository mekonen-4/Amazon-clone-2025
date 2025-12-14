import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from '../Pages/Landing/Landing';
import Auth from '../Pages/Auth/Auth'
import Cart from '../Pages/Cart/Cart'
import Orders from "../Pages/Orders/Orders";
import Payment from '../Pages/Payment/Payment'
import ProductDetails from '../Pages/ProductDetail/ProductDetail'
import Results from '../Pages/Results/Results'

const Routing = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="productdetails" element={<ProductDetails />} />
          <Route path="products/:categoryName" element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
}

export default Routing;
