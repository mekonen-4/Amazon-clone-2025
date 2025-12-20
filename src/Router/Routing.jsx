import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from '../Pages/Landing/Landing';
import Auth from '../Pages/Auth/Auth'
import Cart from '../Pages/Cart/Cart'
import Orders from "../Pages/Orders/Orders";
import Payment from '../Pages/Payment/Payment'
import ProductDetails from '../Pages/ProductDetail/ProductDetail'
import Results from '../Pages/Results/Results'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Sg1lVGSZjSt6y4nqd9PYKns7IuZcDDTRpE0GDt8QiL97KeAGdaW6hlPeEWLANA4ZPJLYI17OwPNDtuooClD4SrR00PE9SW2uA"
);
const Routing = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route
            path="Payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="products/category/:categoryName" element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
}

export default Routing;
