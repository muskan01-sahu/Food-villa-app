import React from 'react';
import { useState } from "react";
import logo from "../assets/image/foodvilla.png";
import { Link } from "react-router-dom";


export const Title = () =>(

    <a href="/">
        <img 
            className="logo" 
            alt="logo"
            src={logo}
        />
        
    </a>
    
);


const Header = () => {
    const[isLoggedIn, setIsLoggedIn ] = useState(false);
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
            {  ( isLoggedIn ?  < button onClick={() => setIsLoggedIn(false)}>Logout</button> : <button onClick={() => setIsLoggedIn(true)}>Login</button>) }

        </div>
    );
};

export default Header;
