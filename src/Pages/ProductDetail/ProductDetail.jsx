import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { endPoint } from '../../Components/Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';
import classes from "./ProductDetail.module.css";
const ProductDetail = () => {
    const [singleProduct,setSingleProduct] = useState(null)
    const {productId}=useParams()
    // console.log(productId);
    useEffect(()=>{
        const fetchSingleProduct = async ()=>{
            try {
                
                const response = await axios.get(`${endPoint}/products/${productId}`)
                // console.log(response);
                setSingleProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProduct()
    },[])
    console.log(singleProduct);
    if (singleProduct!==null){
        
        return (
          <Layout>
            <div className={classes.single_product_container}>
              <ProductCard product={singleProduct} />
            </div>
          </Layout>
        );
    }else{
        <div>loading</div>
    }
}

export default ProductDetail;
