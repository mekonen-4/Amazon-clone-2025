import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { endPoint } from '../../Components/Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';
import Loading from '../../Components/Loading/Loading';
import classes from "./ProductDetail.module.css";
const ProductDetail = () => {
    const [singleProduct,setSingleProduct] = useState(null)
    const [isLoading, setIsLoading]=useState(false);
    const {productId}=useParams()
    // console.log(productId);
    useEffect(()=>{
        const fetchSingleProduct = async ()=>{
            setIsLoading(true);
            
            try {
                
                const response = await axios.get(`${endPoint}/products/${productId}`)
                console.log(response);
                setIsLoading(false)
                setSingleProduct(response.data);
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
        fetchSingleProduct()
    },[])
    console.log(singleProduct);
  
        return (
          <Layout>
            {isLoading ? (
              <Loading />
            ) : (
              <div className={classes.single_product_container}>
                <ProductCard product={singleProduct} flex={true}
                detailDescription={true}
                
                />
              </div>
            )}{" "}
          </Layout>
        );
   
}

export default ProductDetail;
