import React, { useState } from 'react';
import {Rating} from '@mui/material'
import {formatCurrency} from '../CurrencyFormat/CurrencyFormat'
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';
const ProductCard = ({ product, flex, detailDescription }) => {
  const [isHovered, setHovered] = useState(false);
console.log(product);
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
        <button
          className={`${
            isHovered && !flex ? classes.add_to_cart_button : classes.off_button
          } ${flex && classes.detail_page_add_to_cart}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
