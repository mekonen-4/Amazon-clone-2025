import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Payment.module.css";
import ProductCard from "../../Components/Products/ProductCard";
import { CardElement } from "@stripe/react-stripe-js";
import { formatCurrency } from "../../Components/CurrencyFormat/CurrencyFormat";

const Payment = () => {
  const [{ cart, user }] = useContext(DataContext);
  const [cardError, setCardError] = useState("");

  const handleChange = (e) => {
    if (e?.error) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0
  );

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
            <form className={classes.form}>
              <CardElement onChange={handleChange} />

              {cardError && (
                <small className={classes.error}>{cardError}</small>
              )}

              <div className={classes.order_total}>
                Total Order | {formatCurrency(totalAmount)}
              </div>

              <button className={classes.pay_button}>Pay Now</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
