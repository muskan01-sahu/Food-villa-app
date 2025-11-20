import { IMG_CDN_URL } from "../Constants";
import{useContext}  from 'react';


const RestaurantCard = ({name, costForTwo, avgRatingString, sla, cloudinaryImageId}) => {
    const lastMileTravelString = sla.lastMileTravelString;

    
    return(
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
             
            <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                    src={IMG_CDN_URL + cloudinaryImageId}  
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div> 
        
            <div className="p-4 space-y-2">
                <h2 className="font-bold text-xl text-gray-800 truncate">{name}</h2>
                <h3 className="text-gray-600 text-sm">{costForTwo}</h3>
                <div className="flex items-center justify-between">
                    <h4 className="text-yellow-600 font-semibold flex items-center">
                        ⭐ {avgRatingString}
                    </h4>
                    <h4 className="text-gray-500 text-sm">{lastMileTravelString}</h4>
                </div>
            </div>
        
        </div>
    );

};

export default RestaurantCard;