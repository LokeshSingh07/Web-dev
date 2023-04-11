import {FcDeleteDatabase} from 'react-icons/fc'
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast";
import {remove} from '../redux/Slices/CartSlice'



const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  function removeFromCart(){
    dispatch(remove(item.id));
    toast.success("Item removed")
  }
  
  
  return (
    <div>
      <div className='flex justify-around border-b-2 border-gray-400 pb-5 my-8'>

        <div>
          <img src={item.image} width="150px"/>
        </div>

        <div className='w-[350px] flex flex-col gap-4'>
          <h1 className='font-semibold'>{item.title}</h1>
          <h1 className="w-45 text-gray-400 font-normal text-[14px] text-left">{item.description.split(" ").slice(0,15).join(" ") + '... ' }</h1>

          <div className='flex justify-between'>
            <h1 className="text-green-600 font-semibold">${item.price}</h1>
            <div>
              <FcDeleteDatabase onClick={removeFromCart} fontSize="1.75rem"/>
            </div>
          </div>
        </div>


      </div>


    </div>
  );
};

export default CartItem;
