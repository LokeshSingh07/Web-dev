
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {add, remove} from '../redux/Slices/CartSlice'



const Product = ({product}) => {
  
  const {cart} = useSelector((state)=> state);
  const dispatch = useDispatch();

  function addToCart(){
    dispatch(add(product));
    toast.success("Item added to cart");
  }
  function removeFromCart(){
    dispatch(remove(product.id));
    toast.error("Item removed from cart");
  }



  return (
    <div className="flex flex-col items-center justify-between border mx-auto hover:scale-110 transition duration-200 ease-in 
    hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:border-none gap-3 p-4 mt-10 ml-5 rounded-xl">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{product.title}</p>
      </div>
      
      <div>
        <p className="w-45 text-gray-400 font-normal text-[12px] text-left">{product.description.split(" ").slice(0,10).join(" ")+ "..."}</p>
      </div>

      <div>
        <img src={product.image} width="100px"/>    
      </div>

      <div className="w-full flex justify-between items-center mt-5 ">
        <p className="text-green-600 font-semibold">${product.price}</p>

          {
            cart.some((p)=> p.id == product.id) ? 
            (
              <button
              onClick={removeFromCart}
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[14px] p-1 px-3 uppercase
              hover:bg-gray-700 hover:text-white duration-300">
                Remove to Cart
              </button>
            ):
            (
              <button 
              onClick={addToCart}
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[14px] p-1 px-3 uppercase
              hover:bg-gray-700 hover:text-white duration-300">
                Add to cart
              </button>
            )
            
          }
      </div>

    

    </div>
  );
};

export default Product;
