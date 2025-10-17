import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom'
import {filterData} from "../utils/helper";
import useSearch from "../utils/useSearch"; 
import useOnline from '../utils/useOnline'
import UserContext from "../utils/UserContext";

const Body = () => {
    
    const [searchText, setSearchText] = useState("");

    const [
        allRestaurants,
        filteredRestaurants,
        setFilteredRestaurants
    ] = useSearch();

    const isOnline = useOnline();

    const {user,setUser} = useContext(UserContext);

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

            <div className="seach-container p-5 bg-pink-50 my-5">
                <input
                data-testid = "search-input"
                type="text"
                className="focus:bg-green-200 p-2 m-2 bg-white " 
                placeholder="Search" 
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
                />

                <button 
                data-testid = "search-btn"                
                className="p-2 m-2 bg-purple-900 text-white rounded-md hover:bg-gray-500"
                onClick={()=>{
                  //need to filter the data & update the state-restaurants
                  const data = filterData(searchText,allRestaurants);
                //   update the data
                    setFilteredRestaurants(data);
                    
                }}

                >Search</button> 
                <input value={user.name} onChange={
                    e=> setUser({
                        ...user,
                        name:e.target.value,
                    })}>
                </input>

                <input value={user.email} onChange={
                    e=> setUser({
                        ...user,
                        email:e.target.value,
                    })}>
                </input>   
            </div>

            <div className="flex flex-wrap" data-testid = "res-list">
                { 
                    filteredRestaurants?.length === 0 ? (<h1>No Restaurant match your filter</h1>)
                     :
                    (
                    filteredRestaurants.map((restaurant) =>{
                
                        return(
                        <Link to ={"/restaurant/" + restaurant.info.id}
                         key={restaurant.info.id}>
                             <RestaurantCard {...restaurant.info} />
                        </Link>
                        
                     ) }))

                }
                
            </div>
        
        </>
       
    );
};

export default Body;