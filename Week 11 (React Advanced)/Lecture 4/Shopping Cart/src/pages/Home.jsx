import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);



  async function fetchProductData(){
    setLoading(true);
    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log(data);
      setProducts(data);
    }
    catch(err){
      console.log("Error in fetching data through API")
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchProductData();
  }, [])



  return (
    <div>
      {
        loading ? 
        (<div>
          <Spinner/>
        </div>) : 
        (<div>
          {
            products.length > 0 ? 
            (<div>
              {
                products.map((product)=>{
                  return <Product key={product.id} product={product}/>
                })
              }
            </div>) : 
            (<div>
              No data found
            </div>) 
          }
        </div>)
      }

    </div>
  );
};

export default Home;
