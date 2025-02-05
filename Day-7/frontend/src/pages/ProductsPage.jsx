import { useEffect, useState } from "react";
import "../index.css"
import ProductForm from "../Components/ProductForm";
const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    const getData=async()=>{  
      const resp=await fetch("http://localhost:1500/api/v1/products");
      const data=await resp.json();
      console.log(data);
        setProducts(data.data); 
    }
    // getData();
    useEffect(()=>{
      getData();
    },[]);
    console.log(products);
  return (
    <div>
        <ProductForm/>
      <h1>Products Page</h1>
      <div className="card-container">
        {products.map((ele)=>{
            return(
                <div className="card" key={ele._id}>
                    <h4>{ele.title}</h4>
                    <h4>{ele.company}</h4>
                    <h4>{ele.price}</h4>
                    <h4>{ele.discount}</h4>
                    <h4>{ele.discount}</h4>
                </div>
            );
        })}
      </div>
    </div>
  )
}

export default ProductsPage
