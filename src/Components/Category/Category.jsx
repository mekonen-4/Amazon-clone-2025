import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {categoryList} from "./categoryList"
import categoryCss from './Category.module.css'
const Category = () => {
    const [categories , setCategories]=useState([])
    useEffect(()=>{
        const fetchCategories= async  ()=>{
            const response = await axios.get(
              "https://fakestoreapi.com/products/categories"
            );
            console.log(response);
            setCategories(response.data);
        }
        fetchCategories();
    },[])
    console.log(categories);
    return (
      <div className={categoryCss.category_container}>
        {categoryList?.map((category, index) => {
          return (
            <a key={index} href="#">
              <h3>{category.title}</h3>
              <span>
                <img src={category.imgUrl} alt="" />
              </span>
              <p>Shop now</p>
            </a>
          );
        })}
      </div>
    );
}

export default Category;
