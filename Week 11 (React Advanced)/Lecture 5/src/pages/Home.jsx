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
    <div className="">
      {
        loading ? 
        (<div className="h-[75vh] flex justify-center items-center">
          <Spinner/>
        </div>) : 
        (<div>
          {
            products.length > 0 ? 
            (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl min-h-[80vh] p-2 space-y-10 space-x-5 mx-auto">
              {
                products.map((product)=>{
                  return <Product key={product.id} product={product}/>
                })
              }
            </div>) : 
            (<div className="flex justify-center items-center">
              No data found
            </div>) 
          }
        </div>)
      }

    </div>
  );
};

export default Home;
