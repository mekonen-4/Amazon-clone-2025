import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Payment.module.css";
import ProductCard from "../../Components/Products/ProductCard";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { formatCurrency } from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Components/Api/axios";
import { ClipLoader } from "react-spinners";

import { db } from "../../Utility/fireBase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setCardError(e?.error ? e.error.message : "");
  };
  const navigate = useNavigate()
  const totalItem = cart?.reduce((sum, item) => sum + item.amount, 0);
  const totalAmount = Math.round(
    cart.reduce((sum, item) => sum + item.product.price * item.amount, 0)
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setCardError("");
    setSuccessMessage("");

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet.");
      setProcessing(false);
      return;
    }

    try {
      // 1. Create payment intent on backend
      const response = await axiosInstance.post(
        `/payment/create?total=${totalAmount * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      // 2. Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status !== "succeeded") {
        setCardError("Payment failed. Please try again.");
        setProcessing(false);
        return;
      }

      // 3. Save order to Firestore (v9)
      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );
      await setDoc(orderRef, {
        cart,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      navigate('/orders',{state:{msg:'you have placed new order'}});
      // 4. Clear cart
      // dispatch({ type: "CLEAR_CART" });

      setSuccessMessage("Payment successful! Thank you for your order.");
    } catch (err) {
      console.error(err);
      setCardError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div className={classes.address}>
            <div>{user?.email}</div>
            <div>123 React Street</div>
            <div>Ethiopia / Mekelle</div>
          </div>
        </div>

        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.items}>
            {cart?.map((item, index) => (
              <div className={classes.item} key={index}>
                <ProductCard product={item.product} cartFlex />
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* Payment Method */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_method}>
            <form onSubmit={handlePayment} className={classes.form}>
              <CardElement onChange={handleChange} />
              {cardError && (
                <small className={classes.error}>{cardError}</small>
              )}
              {successMessage && (
                <small className={classes.success}>{successMessage}</small>
              )}

              <div className={classes.order_total}>
                Total Order | {formatCurrency(totalAmount)}
              </div>

              <button
                type="submit"
                className={classes.pay_button}
                disabled={processing}
              >
                {processing ? (
                  <div className={classes.payment_loading}>
                    <ClipLoader color="gray" loading={true} size={25} />
                    <p>Please wait ...</p>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
