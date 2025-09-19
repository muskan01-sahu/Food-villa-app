import React from 'react';
import { useState } from "react";
import Logo from "../assets/image/foodvilla.png";
import { Link } from "react-router-dom";
import useOnline from '../utils/useOnline';


export const Title = () =>(

    <a href="/">
        <img 
            className="logo" 
            alt="logo"
            src={Logo}
        />
        
    </a>
    
);


const Header = () => {
    const[isLoggedIn, setIsLoggedIn ] = useState(false);
    const isOnline = useOnline();
    return(
        <div className="header">
            <Title/>

            <div className="nav-items">
                <ul>
                    <Link to = "/home">
                    <li>Home</li>
                    </Link>
                    
                    <li><Link to = "/about">About </Link></li>

                    <Link to = "/contact">
                    <li>Contact</li>
                    </Link>

                    <Link to = "/cart">
                    <li>Cart</li>
                    </Link>

                </ul>

            </div>
            <h1>{isOnline ? "✅":"🔴"}</h1>
            {  ( isLoggedIn ?  < button onClick={() => setIsLoggedIn(false)}>Logout</button> : <button onClick={() => setIsLoggedIn(true)}>Login</button>) }

        </div>
    );
};

export default Header;
