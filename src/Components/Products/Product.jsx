import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'
const Product = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await axios.get(
              "https://fakestoreapi.com/products"
            );
            setProducts(response.data)
            }catch(err){
                console.log(err.message);
            }
        }
        fetchProducts();
        
    },[])
    // console.log(products);
    return (
      <div className={classes.product_upper_container}>
        {products?.map((product,index)=>{
            return(
                 <ProductCard key={index} product={product} />
            )
           
        })}
      </div>
    );
}

export default Product;
