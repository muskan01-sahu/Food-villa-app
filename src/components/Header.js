import React from 'react';
import { useState ,useContext} from "react";
import Logo from "../assets/image/foodvilla.png";
import { Link } from "react-router-dom";
import useOnline from '../utils/useOnline';
import UserContext from "../utils/UserContext";
import { useSelector } from 'react-redux';
import store from '../utils/store';


export const Title = () =>(

    <a href="/">
        <img 
            className="h-28 pl-2" 
            alt="logo"
            src={Logo}
        />
        
    </a>
    
);


const Header = () => {
    const[isLoggedIn, setIsLoggedIn ] = useState(false);
    const isOnline = useOnline();

    const {user} = useContext(UserContext);

    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    return(
        <div className="flex p-2 justify-between items-center bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
            <Title/>

            <div className="nav-items">
                <ul className="flex px-10 ">
                    <Link to = "/home">
                    <li className="px-2">Home</li>
                    </Link>
                    
                    <li className="px-2"><Link to = "/about">About </Link></li>

                    <Link to = "/contact">
                    <li className="px-2">Contact</li>
                    </Link>

                    <Link to = "/cart">
                    <li className="px-2">Cart - {cartItems.length} items</li>
                    </Link>

                    <Link to = "/instamart">
                        <li className="px-2">Instamart</li>
                    </Link>

                </ul>

            </div>
            <h1 className="p-10 font-bold text-red-900">{isOnline ? "✅":"🔴"}</h1>
           <span className="p-10 font-bold text-red-900">{user.name}</span>
            {  ( isLoggedIn ?  
            < button className="" onClick={() => setIsLoggedIn(false)}>Logout</button> 
            : 
            <button className=""  onClick={() => setIsLoggedIn(true)}>Login</button>) }

        </div>
    );
};

export default Header;
