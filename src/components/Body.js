import RestaurantCard from "./RestaurantCard";
import { useState, useContext} from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom'
import useSearch from "../utils/useSearch";
import {filterData} from "../utils/helper";

const Body = () => {
    const [searchText, setSearchText] = useState("");

    const [
        allRestaurants,
        filteredRestaurants,
        setFilteredRestaurants
    ] = useSearch();


    if(!allRestaurants) return null;


    // if(filteredRestaurants?.length === 0) 
    //     return <h1>No Restaurant match your filter</h1>

    return allRestaurants?.length === 0 ? (
        <Shimmer/>
        ) : (
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl shadow-sm border border-purple-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <input
                        data-testid = "search-input"
                        type="text"
                        className="flex-1 px-4 py-3.5 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        placeholder="Search" 
                        value={searchText}
                        onChange={(e) => {
                             setSearchText(e.target.value);
                        }}
                    />

                    <button                
                        className="px-8 py-3.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={()=>{
                            //need to filter the data & update the state-restaurants
                        if(allRestaurants && allRestaurants.length > 0) {
                            const data = filterData(searchText, allRestaurants);
                                //   update the data
                            setFilteredRestaurants(data);
                            }
                                
                        }}

                        >Search
                    </button> 
            
                </div>
            </div>
                {/* restaurant grid */}
                <div className="max-w-7xl mx-auto px-4 py-10">
                        { 
                            filteredRestaurants?.length === 0 ? (
                                <div className="text-center py-20">
                                    <h1 className="text-2xl font-bold text-gray-600">No Restaurant matches your filter</h1>
                                    <p className="text-gray-500 mt-2">Try searching for something else</p>
                                </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="restaurant-list">
                                {filteredRestaurants.map((restaurant) =>{
                            
                                    return(
                                        <Link to ={"/restaurant/" + restaurant.info.id}
                                            key={restaurant.info.id}
                                            className="transform transition-all duration-300 hover:scale-105">
                                            <RestaurantCard {...restaurant.info}
                                             />
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        
                </div>        
        </div>    
    );
};

export default Body;