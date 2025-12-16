import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Components/Products/ProductCard';
import { endPoint } from '../../Components/Api/endPoints';
import classes from './Results.module.css'
import Loading from '../../Components/Loading/Loading';

const Results = () => {
    const [categoryProducts,setCategoryProducts]= useState([]);
        const [isLoading, setIsLoading] = useState(false);
    
    const {categoryName}=useParams()
    // console.log(categoryName);
    useEffect(()=>{
        const fetchCategory= async ()=>{
          setIsLoading(true);
            try {
                const response = await axios.get(`${endPoint}/products/category/${categoryName}`);
                 setCategoryProducts(response.data)
          setIsLoading(false);

                // console.log(response);
                
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
        }
        fetchCategory();
    },[categoryName])
    // console.log(categoryProducts);
    return (
      <>
        <Layout>
       
          <p style={{padding:'15px 0 0 10px',fontWeight:'bold', fontSize:'18px'}}>Category / {categoryName}</p>
       
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
        </Layout>
      </>
    );
}

export default Results;
