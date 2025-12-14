import React, { useState } from 'react';
import {Rating} from '@mui/material'
import {formatCurrency} from '../CurrencyFormat/CurrencyFormat'
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';
const ProductCard = ({product}) => {
    const [isHovered,setHovered]=useState(false)

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes.product_container}
      >
        <Link to={`/products/${product?.id}`}>
          <img  src={product?.image} alt={product?.category} />
        </Link>
        <div className={classes.product_description}>
          <p className={classes.product_title }>{product?.title}</p>
          <div>
            <Rating className={classes.product_rating} value={product?.rating.rate} precision={0.5} />
            <p>{product?.rating.count}</p>
          </div>
          <p className={classes.product_price}>
            {formatCurrency(product?.price)}{" "}
          </p>
        </div>
        <button
          className={
            isHovered ? classes.add_to_cart_button : classes.off_button
          }
        >
          Add to Cart
        </button>
      </div>
    );
}

export default ProductCard;
