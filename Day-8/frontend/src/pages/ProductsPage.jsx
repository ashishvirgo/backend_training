import { useEffect, useState } from "react";
import "../index.css"
import ProductForm from "../Components/ProductForm";
const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    const getData=async()=>{  
      const resp=await fetch("http://localhost:1502/api/v1/products");
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
                  <img src={ele.thumbnail} width='100' height='100'/>
                    <h4>{ele.title}</h4>
                    <h4>{ele.company}</h4>
                    <h4>Rs {ele.price}&#8377;</h4>
                    <h4>{ele.discount}</h4>
                    <h4>{ele.quantity}</h4>
                    
                </div>
            );
        })}
      </div>
    </div>
  )
}

export default ProductsPage
