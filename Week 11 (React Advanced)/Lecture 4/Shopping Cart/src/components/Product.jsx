import { useState } from "react";

const Product = ({product}) => {
  
  const [selected, setSelected] = useState(false);



  return (
    <div className="">
      <div>
        <p>{product.title}</p>
      </div>
      
      <div>
        <p>{product.description}</p>
      </div>

      <div>
        <img src={product.image}/>    
      </div>

      <div>
        <p>{postMessage.price}</p>
      </div>

      <button>
        {
          selected ? (<p>Remove Item</p>) : (<p>Add to Cart</p>)
        }
      </button>

    </div>
  );
};

export default Product;
