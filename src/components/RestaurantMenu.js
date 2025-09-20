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
        <div className="flex p-5 m-5 place-content-evenly">
           <div>
                <h1 className="font-bold text-2xl">Restaurant id: {resId}</h1>
                <h2 className="font-bold text-xl">{restaurant.cards?.[2].card?.card?.info?.name}</h2>
                <img className="w-56 my-3 shadow-xl rounded-md" src= { IMG_CDN_URL + restaurant.cards?.[2].card?.card?.info?.cloudinaryImageId}/>
                <h2 className="font-semibold">{restaurant.cards?.[2].card?.card?.info?.areaName}</h2>
                <h2 className="font-semibold">{restaurant.cards?.[2].card?.card?.info?.city}</h2>
                <h2 className="font-semibold">{restaurant.cards?.[2].card?.card?.info?.avgRating}</h2>
                <h2 className="font-semibold">{restaurant.cards?.[2].card?.card?.info?.costForTwoMessage}</h2>
           </div>
           <div>
            <h1 className="font-bold text-3xl">Menu</h1>
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