import React, { useContext, useState } from "react";
import { Rating } from "@mui/material";
import { formatCurrency } from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
const ProductCard = ({ product, flex, detailDescription,removeAddToCart }) => {
  const [isHovered, setHovered] = useState(false);
  // console.log(product);
  const [, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_CART,
      item: {
        product,
      },
    });
  };
  // console.log(state);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${classes.product_container} ${
        flex && classes.detail_page_flex
      }`}
    >
      <div>
        <Link to={`/products/${product?.id}`}>
          <img src={product?.image} alt={product?.category} />
        </Link>
      </div>
      <div className={classes.product_description}>
        <p className={classes.product_title}>{product?.title}</p>
        {detailDescription && (
          <p className={classes.detail_description}>{product?.description}</p>
        )}
        <div>
          <Rating
            className={classes.product_rating}
            value={product?.rating.rate}
            precision={0.5}
          />
          <p>{product?.rating.count}</p>
        </div>
        <p className={classes.product_price}>
          {formatCurrency(product?.price)}{" "}
        </p>
        {!removeAddToCart && (
          <button
            className={`${
              isHovered && !flex
                ? classes.add_to_cart_button
                : classes.off_button
            } ${flex && classes.detail_page_add_to_cart}`}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
