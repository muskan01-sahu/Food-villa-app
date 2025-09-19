import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";

const RestaurantMenu = () => {
    const {resId} = useParams();

    const restaurant = useRestaurant(resId);

    const regularCards = restaurant.cards?.find(
    (card) => card?.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

   const menuItems = regularCards
    ?.map((card) => card.card?.card)
    ?.filter((card) => card?.itemCards)
    ?.flatMap((card) => card.itemCards)
    ?.map((item) => item.card?.info?.name);

   

    return (!restaurant.cards) ? <Shimmer/>: (
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