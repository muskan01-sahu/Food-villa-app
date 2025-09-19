import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom'
import {filterData} from "../utils/helper";
import useSearch from "../utils/useSearch"; 
import useOnline from '../utils/useOnline'

const Body = () => {
    
    const [searchText, setSearchText] = useState("");

    const [
        allRestaurants,
        filteredRestaurants,
        setFilteredRestaurants
    ] = useSearch();

    const isOnline = useOnline();

    if(!isOnline){
        return <h1>🔴Offline, Please check your internet connection!!!!!!!</h1>
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
                             <RestaurantCard {...restaurant.info}/>
                        </Link>
                     ) }))

                }
                
            </div>
        
        </>
       
    );
};

export default Body;