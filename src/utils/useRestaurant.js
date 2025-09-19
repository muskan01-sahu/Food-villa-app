import {useState, useEffect} from "react";
import { FETCH_MENU_URL } from "../Constants";

const useRestaurant = (resId) =>{
    const [restaurant, setRestaurant] = useState({}); 
    
    useEffect(() => {
        getRestaurantInfo();
    }, []);
    
    async function getRestaurantInfo(){
        const data = await fetch(FETCH_MENU_URL(resId));
        const json = await data.json();
        console.log(json.data);
        setRestaurant(json.data);
    };    
    
    //return restaurant data
    return restaurant;
};

export default useRestaurant;