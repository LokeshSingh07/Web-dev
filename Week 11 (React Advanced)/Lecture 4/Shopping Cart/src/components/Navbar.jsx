import {FaShoppingCart} from "react-icons/fa"
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-11/12 flex flex-row justify-between items-center py-2 mx-auto">
      <div>
        <NavLink to="/">
          <img src="https://www.shutterstock.com/image-vector/reborn-company-flat-text-logo-260nw-1763219495.jpg" width="150"/>
        </NavLink>
      </div>

      <div className="flex gap-5">
        <NavLink to="/">Home</NavLink>
        
        <NavLink to="/cart">
          <FaShoppingCart fontSize="1.5rem"/>
        </NavLink>
      </div>



    </div>
  )
};

export default Navbar;
