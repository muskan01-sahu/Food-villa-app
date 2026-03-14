import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const Title = () =>(

    <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
        <img 
            className="h-20 sm:h-26" 
            alt="logo"
            src="https://foodvilla.ng/wp-content/uploads/2020/12/FOOD_VILLA-removebg-preview.png"
        />
        
    </a>
    
);


const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        };

        window.addEventListener("authChange", handleAuthChange);
        return () => window.removeEventListener("authChange", handleAuthChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
    };

    const handleLoginNavigate = () => {
        navigate("/login");
    };

    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    return(
        <div className="sticky top-0 z-50 bg-amber-50 shadow-md border-b border-amber-200">
            <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-20">
                <div className="flex justify-between items-center py-3">
                        <Title/>

                    <div className="nav-items">
                        <ul className="flex items-center gap-2 sm:gap-4">
                            <Link to="/home" className="group">
                                <li className="px-px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-white hover:text-purple-600 transition-all duration-200">Home</li>
                            </Link>
                        

                            <Link to = "/cart">
                                <li className="px-px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-white hover:text-purple-600 transition-all duration-200" >
                                    Cart - {cartItems.length} items
                                    {cartItems.length > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                        {cartItems.length}
                                                    </span>
                                    )}
                                </li>
                            </Link>

                        </ul>   

                    </div>
            
                    {  ( isLoggedIn ?  
                    <button 
                    className="px-5 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-sm" 
                    onClick={handleLogout}>
                        Logout
                    </button> 
                    : 
                    <button 
                    className="px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-sm" 
                    onClick={handleLoginNavigate}>
                        Login
                    </button>
                    )}

            </div>
            </div>
        </div>
    );
};

export default Header;
