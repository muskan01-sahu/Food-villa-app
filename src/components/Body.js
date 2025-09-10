import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";

function filterData(searchText,restaurants) {
   
    const filterData = restaurants.filter((restaurant) =>
         restaurant.info.name.includes(searchText)
    );
    return filterData;
}

const Body = () => {
    const [restaurants, setRestaurants] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");

    useEffect(() =>{
        getRestaurants();
    }, []);

    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.2677662&lng=81.618469&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json);
        setRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

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