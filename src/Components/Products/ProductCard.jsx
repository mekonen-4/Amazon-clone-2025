import React, { useContext, useState } from "react";
import { Rating } from "@mui/material";
import { formatCurrency } from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({
  product,
  flex,
  detailDescription,
  removeAddToCart,
  cartFlex,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_CART,
      product,
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${classes.product_container}
        ${flex ? classes.detail_page_flex : ""}
        ${cartFlex ? classes.cart_flex_container : ""}`}
    >
      {/* IMAGE */}
      <div>
        <Link to={`/products/${product?.id}`}>
          <img src={product?.image} alt={product?.title} />
        </Link>
      </div>

      {/* DESCRIPTION */}
      <div
        className={`${classes.product_description}
          ${cartFlex ? classes.cart_product_description : ""}`}
      >
        <p className={classes.product_title}>{product?.title}</p>

        {/* DETAIL PAGE ONLY */}
        {detailDescription && !cartFlex && (
          <p className={classes.detail_description}>{product?.description}</p>
        )}

        {/* RATING (GRID & DETAIL, NOT CART) */}
        {!cartFlex && (
          <div>
            <Rating
              className={classes.product_rating}
              value={product?.rating?.rate}
              precision={0.5}
              readOnly
            />
            <p>{product?.rating?.count}</p>
          </div>
        )}

        <p className={classes.product_price}>
          {formatCurrency(product?.price)}
        </p>

        {/* ADD TO CART */}
        {!removeAddToCart && (
          <button
            className={`
    ${flex ? classes.detail_page_add_to_cart : ""}
    ${flex ? classes.add_to_cart_button : ""}
    ${!flex && isHovered ? classes.add_to_cart_button : ""}
    ${!flex && !isHovered ? classes.off_button : ""}
  `}
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
