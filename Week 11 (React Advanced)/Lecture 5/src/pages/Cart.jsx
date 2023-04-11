import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";



const Cart = () => {

  const {cart} = useSelector((state)=> state);
  console.log("Printing product");
  console.log(cart)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    setTotalAmount(cart.reduce((acc, curr)=> acc+curr.price, 0)) 
  },[cart]);




  return (
    <div className="max-w-6xl mx-auto">
      {
        cart.length > 0 ? 
        (
          <div className="flex justify-center gap-[5rem]">
            <div className="w-[600px]">
              {
                cart.map((item, index)=> {
                  return <CartItem key={item.id} item={item} itemIndex={index}/>
                })
              }
            </div>
            
            <div className="w-[320px] h-[60vh] flex flex-col justify-between mt-[6rem]">
              <div>
                <div className="uppercase">Your Cart</div>
                <div className="text-[2.5rem] font-bold uppercase text-green-600">Summary</div>
                <p>
                  <span>Total items : {cart.length}</span>
                </p>
              </div>
              <div>
                <p>Total Amount: <span className="font-semibold">${totalAmount}</span></p>
                <button className="w-full bg-green-600 text-white text-[1rem] font-semibold text-center rounded-lg py-2 mt-[1rem]">CheckOut Now</button>
              </div>
            </div>
          </div>
        ) :

        (
          <div className="h-[70vh] flex flex-col justify-center items-center">
            <h1 className="font-semibold text-[18px]">Cart Empty</h1>
            <NavLink to="/">
              <button className="w-[250px] bg-green-600 text-white text-[1rem] font-semibold text-center rounded-lg py-2 mt-[1rem]">Shop Now</button>
            </NavLink>
          </div>
        )




      }



    </div>
  );
};

export default Cart;
