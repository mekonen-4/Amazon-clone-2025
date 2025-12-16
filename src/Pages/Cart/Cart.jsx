import React, { useContext } from 'react';
import Layout from '../../Components/Layout/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Products/ProductCard'
import { formatCurrency } from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css'
const Cart = () => {
  const [state] = useContext(DataContext);
  // console.log(state.cart[0].product);
//   let totalAmount = 0;
  let totalAmount = state.cart.reduce((sum,item)=>{
      return item.product.price +sum
  },0)
  return (
    <Layout>
      <section className={classes.cart_container}>
        <div className={classes.cart_label}>
          <p>Hello</p>
          <p>Your Shopping basket</p>
          <hr />

          {state.cart.length === 0 ? (
            <p>opps! no item in your card</p>
          ) : (
            state.cart.map((singleProduct, index) => {
              console.log(singleProduct);
              totalAmount += singleProduct.product.price;
              return (
                <ProductCard
                  key={index}
                  product={singleProduct?.product}
                  flex={true}
                  detailDescription={true}
                  removeAddToCart={true}
                ></ProductCard>
              );
            })
          )}
        </div>
        <div className={classes.cart_payment_summary}>
          {state.cart !== 0 && (
            <>
              <p className={classes.cart_total_money}>
                Subtotal( {state.cart.length} items):{" "}
                <span>{formatCurrency(totalAmount)}</span>
              </p>

              <span className={classes.payment_gift_text}>
                <input type="checkbox" name="" id="" />
                <span> This order contains a gift</span>
              </span>
              <Link to="/payment" className={classes.continue_to_checkout_page}>
                Continue to Checkout
              </Link>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Cart;
// style={{ display: "grid",gridTemplateColumns:'1fr 200px',gap:'10px' }}