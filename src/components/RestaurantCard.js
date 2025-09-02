import { IMG_CDN_URL } from "../Constants";


const RestaurantCard = ({name, cuisines, sla, cloudinaryImageId}) => {
    const lastMileTravelString = sla.lastMileTravelString;
    return(
        
        <div className="card">
             <img src={IMG_CDN_URL + cloudinaryImageId}  />  
            
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h4>{lastMileTravelString} minutes</h4>

        </div>
    );

};

export default RestaurantCard;