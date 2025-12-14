import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'
import { endPoint } from '../Api/endPoints';
import Loading from '../Loading/Loading';
const Product = () => {
    const [products,setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${endPoint}/products`);
          const results = response.data;
          setProducts(results);
        setIsLoading(false);

        } catch (err) {
          console.log(err.message);
        setIsLoading(false);

        }
      };
      fetchProducts();
    }, []);
    // console.log(products);
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={classes.product_upper_container}>
            {products?.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>
        )}
      </>
    );
}

export default Product;
