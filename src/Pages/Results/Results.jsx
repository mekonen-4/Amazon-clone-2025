import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Components/Products/ProductCard';
import { endPoint } from '../../Components/Api/endPoints';
import classes from './Results.module.css'

const Results = () => {
    const [categoryProducts,setCategoryProducts]= useState([]);
    const {categoryName}=useParams()
    // console.log(categoryName);
    useEffect(()=>{
        const fetchCategory= async ()=>{
            try {
                const response = await axios.get(`${endPoint}/products/category/${categoryName}`);
                 setCategoryProducts(response.data)
                // console.log(response);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategory();
    },[categoryName])
    // console.log(categoryProducts);
    return (
      <Layout>
        <div className={classes.category_product_container}>
          {categoryProducts?.map((categoryProduct) => {
            // console.log(categoryProduct);
            return (
              <Fragment key={categoryProduct.id}>
                <ProductCard product={categoryProduct} />
              </Fragment>
            );
          })}
        </div>
      </Layout>
    );
}

export default Results;
