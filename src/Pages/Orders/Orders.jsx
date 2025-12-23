import React, { Fragment, useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utility/fireBase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../Components/Products/ProductCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <section className={classes.upper_container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ color: "" }}>you do not have any order yet</div>
          )}
          <div>
            <div>
              {orders.map((order) => (
                <Fragment key={order.id}>
                  <div className={classes.order_card}>
                    <div className={classes.order_header}>
                      <p>
                        <strong>Order ID:</strong> {order.id}
                      </p>

                     
                    </div>

                    <div className={classes.products}>
                      {order.cart.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product.product}
                          cartFlex
                        />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
