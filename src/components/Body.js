import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";

function filterData(searchText,restaurants) {
   
    const filterData = restaurants.filter((restaurant) =>
         restaurant.info.name.includes(searchText)
    );
    return filterData;
}

const Body = () => {
    const [restaurants, setRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    return(
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
                  const data = filterData(searchText,restaurants);
                //   update the data
                    setRestaurants(data);
                    
                }}

                >Search</button> 
            </div>

            <div className="restaurant-list">
                {
                    restaurants.map((restaurant) =>{
                        return  <RestaurantCard {...restaurant.info} key={restaurant.info.id}/>;
                    })
                }
            </div>
        
        </>
       
    );
};

export default Body;