import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom'

function filterData(searchText,restaurants) {
   
    const filterData = restaurants.filter((restaurant) =>
         restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData;
}

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() =>{
        getRestaurants();
    }, []);

    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.2677662&lng=81.618469&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json);
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    }



    if(!allRestaurants) return null;

    // if(filteredRestaurants?.length === 0) 
    //     return <h1>No Restaurant match your filter</h1>

    return allRestaurants?.length === 0 ? (
        <Shimmer/>
        ) : (
        <>

            <div className="seach-container">
                <input
                type="text"
                className="search-input" 
                placeholder="Search" 
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                />

                <button className="search-btn"
                onClick={()=>{
                  //need to filter the data & update the state-restaurants
                  const data = filterData(searchText,allRestaurants);
                //   update the data
                    setFilteredRestaurants(data);
                    
                }}

                >Search</button> 
            </div>

            <div className="restaurant-list">
               
                {
                    filteredRestaurants?.length === 0 ? (<h1>No Restaurant match your filter</h1>)
                     :
                    (
                    filteredRestaurants.map((restaurant) =>{
                        return(
                        <Link to ={"/restaurant/" + restaurant.info.id}
                         key={restaurant.info.id}>
                            return  <RestaurantCard {...restaurant.info}/>;
                        </Link>
                     ) }))

                }
                
            </div>
        
        </>
       
    );
};

export default Body;