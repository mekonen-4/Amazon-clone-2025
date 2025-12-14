import React, {  } from 'react';
// import axios from 'axios'
import {Link} from 'react-router-dom'
import {categoryList} from "./categoryList"
import categoryCss from './Category.module.css'
const Category = () => {
    // const [categories , setCategories]=useState([])
    // useEffect(()=>{
    //     const fetchCategories= async  ()=>{
    //         const response = await axios.get(
    //           "https://fakestoreapi.com/products/categories"
    //         );
    //         // console.log(response);
    //         setCategories(response.data);
    //     }
    //     fetchCategories();
    // },[])
    // console.log(categories);
    return (
      <div className={categoryCss.category_container}>
        {categoryList?.map((category, index) => {
          // console.log(category);
          return (
            <Link
              key={index}
              to={`/products/category/${category.name}`}
            >
              <h3>{category.title}</h3>
              <span>
                <img src={category.imgUrl} alt="" />
              </span>
              <p>Shop now</p>
            </Link>
          );
        })}
      </div>
    );
}

export default Category;
