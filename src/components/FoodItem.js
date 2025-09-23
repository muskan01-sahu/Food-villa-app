import { IMG_CDN_URL } from "../Constants";
import{useContext}  from 'react';
import UserContext from "../utils/UserContext";

const FoodItem = ({name, description, imageId, price}) => {
    return(
        
        <div className="w-56 p-2 m-2 shadow-lg bg-pink-50 ">
             <img src={IMG_CDN_URL + imageId}  />  
            
            <h2 className="font-bold text-xl ">{name}</h2>
            <h3>{description}</h3>
            <h4>Rupees: {price/100}</h4>
        
        
        </div>
    );

};

export default FoodItem;