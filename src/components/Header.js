import { useState } from "react";

const LoggedInUser = () => {
    // API call to check authentication
    return true; 
};

export const Title = () =>(
    <a href="/">
        <img 
            className="logo" 
            alt="logo"
            src="https://yt3.ggpht.com/ytc/AKedOLSpK3T_2RxkMYb-pk9oENQB0NvYpeOdXRgQe8i5=s800-c-k-c0x00ffffff-no-rj"
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
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>

            </div>
            {  (isLoggedIn ?  < button onClick={() => setIsLoggedIn(false)}>Logout</button> : <button onClick={() => setIsLoggedIn(true)}>Login</button>) }

        </div>
    );
};

export default Header;
