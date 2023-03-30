import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../assets/Logo.svg'




function Navbar({isLoggedin, setIsLoggedin}){
    return (
        <div className=' w-full flex justify-evenly items-center'>
            <Link to="/">
                <img src={Logo} width={160} height={32} alt="This is logo"/>
            </Link>

            <nav>
                <ul className='flex gap-4'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>


            {/* login - signup - logout - Dashboard */}
            <div className='flex gap-4'>
                {
                    !isLoggedin &&
                    (
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    )
                }
                {
                    !isLoggedin &&
                    (
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    )
                }
                {
                    isLoggedin &&
                    (
                        <Link to="/">
                            <button onClick={()=>{
                                setIsLoggedin(false);
                                toast.success("Logout Successfull");
                            }}>Logout</button>
                        </Link>
                    )
                }
                {
                    isLoggedin && 
                    (
                        <Link to="/dashboard">
                            <button>Dashboard</button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
export default Navbar;