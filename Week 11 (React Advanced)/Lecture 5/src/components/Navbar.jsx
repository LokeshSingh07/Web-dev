import {FaShoppingCart} from "react-icons/fa"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'


const Navbar = () => {

  const {cart} = useSelector((state)=> state);

  return (
    <nav className="max-w-6xl h-20 flex flex-row justify-between items-center py-2 px-5 mx-auto">
      <div>
        <NavLink to="/">
          <img src={Logo} width="150"/>
        </NavLink>
      </div>

      <div className="flex items-center font-semibold text-slate-100 space-x-6">
        <NavLink to="/">Home</NavLink>
        
        <NavLink to="/cart" className="relative">
          <FaShoppingCart fontSize="1.5rem"/>
            {
              cart.length > 0 &&
              <span className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-green-600 text-white rounded-full animate-bounce">
                {cart.length}
              </span>
            }
        </NavLink>
      </div>


    </nav>
  )
};

export default Navbar;
