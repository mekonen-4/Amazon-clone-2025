import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { formatCurrency } from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const [state, dispatch] = useContext(DataContext);

  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0
  );

  const increase = (product) => {
    dispatch({ type: Type.ADD_TO_CART, product });
  };

  const decrease = (id) => {
    dispatch({ type: Type.REMOVE_FROM_CART, id });
  };

  return (
    <Layout>
      <section className={classes.cart_container}>
        {/* LEFT */}
        <div className={classes.cart_label}>
          <h2>Your Shopping Cart</h2>
          <hr />

          {state.cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            state.cart.map((item, index) => (
              <section key={index} className={classes.cart_product}>
                <ProductCard product={item.product} cartFlex removeAddToCart />

                <div className={classes.cart_quantity}>
                  <button onClick={() => decrease(item.product.id)}>
                    <IoIosArrowDown />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => increase(item.product)}>
                    <IoIosArrowUp />
                  </button>
                </div>

                <p className={classes.cart_price}>
                  {formatCurrency(item.product.price)}
                </p>
                <button
                  className={classes.cart_remove_button}
                  onClick={() =>
                    dispatch({
                      type: Type.REMOVE_PRODUCT_COMPLETELY,
                      id: item.product.id,
                    })
                  }
                >
                  Remove
                </button>
              </section>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className={classes.cart_payment_summary}>
          <p className={classes.cart_total_money}>
            Subtotal ({state.cart.length} items):
            <span>{formatCurrency(totalAmount)}</span>
          </p>

          <label className={classes.payment_gift_text}>
            <input type="checkbox" />
            This order contains a gift
          </label>

          <Link to="/payment" className={classes.continue_to_checkout_page}>
            Proceed to Checkout
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
