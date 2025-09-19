import { useState, useEffect} from "react";
import { FETCH_URL } from "../Constants";
const useSearch = () =>{
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() =>{
        getRestaurants();
    }, []);

    async function getRestaurants(){
        const data = await fetch(FETCH_URL);
        const json = await data.json();
        console.log(json);
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    }

    return[
        allRestaurants,
        filteredRestaurants,
        setFilteredRestaurants
    
    ];
}

export default useSearch;