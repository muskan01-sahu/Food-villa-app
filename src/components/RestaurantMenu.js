import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const {resId} = useParams();

    const [restaurant, setRestaurant] = useState({}); 

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo(){
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.2677662&lng=81.618469&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await data.json();
        console.log(json.data);
        setRestaurant(json.data);
    };

    const regularCards = restaurant.cards?.find(
    (card) => card?.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

   const menuItems = regularCards
    ?.map((card) => card.card?.card)
    ?.filter((card) => card?.itemCards)
    ?.flatMap((card) => card.itemCards)
    ?.map((item) => item.card?.info?.name);

   

    return(!restaurant.cards) ? <Shimmer/>: (
        <div className="menu">
           <div>
                <h1>Restaurant id: {resId}</h1>
                <h2>{restaurant.cards?.[2].card?.card?.info?.name}</h2>
                <img src= { IMG_CDN_URL + restaurant.cards?.[2].card?.card?.info?.cloudinaryImageId}/>
                <h2>{restaurant.cards?.[2].card?.card?.info?.areaName}</h2>
                <h2>{restaurant.cards?.[2].card?.card?.info?.city}</h2>
                <h2>{restaurant.cards?.[2].card?.card?.info?.avgRating}</h2>
                <h2>{restaurant.cards?.[2].card?.card?.info?.costForTwoMessage}</h2>
           </div>
           <div>
            <h1>Menu</h1>
            <ul>
                 {menuItems?.map((item,index) => (
                        <li key={index}>
                            {item} 
                        </li>
                    ))}
            </ul>
           
           
           </div>
        </div>
    );
};

export default RestaurantMenu;