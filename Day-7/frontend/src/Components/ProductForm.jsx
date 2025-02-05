const ProductForm = () => {
  const postProduct=async(dataobj)=>{
    await fetch('http://localhost:1500/api/v1/products',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataobj),
    });  
  }
    const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log(e);
      const values=e.target;
      const title=values[0].value;
      const discount=values[1].value;
      const price=values[2].value;
      const company=values[3].value;
      const quantity=values[4].value;
      console.log(title,discount,price,company,quantity);
      const dataob={
        title: title ,
        discount: discount || undefined,
        price: price,
        company: company || undefined,
        quantity: quantity || undefined,
      }
      console.log(dataob);
      postProduct(dataob);
      //const resp=await fetch('http://localhost:1500/api/v1/products');
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Title</label>
            <input type="text" name="title"></input>
        </div>
        <div>
            <label>Discount</label>
            <input type="number" name="discount"></input>
        </div>
        <div>
            <label>Price</label>
            <input type="number" name="price"></input>
        </div>
        <div>
            <label>Company</label>
            <input type="text" name="company"></input>
        </div>
        <div>
            <label>Quantity</label>
            <input type="number" name="quantity"></input>
        </div>
        <div>
            <button>Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
