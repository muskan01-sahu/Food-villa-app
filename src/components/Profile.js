import { useState, useEffect } from "react";


const Profile = (props) => {
   const [count, setCount]=  useState("0");
   const [count1, setCount1]=  useState("0");

   useEffect(() => {
    
    //Api call
    // console.log("useEffect"); 
   }, [])
//    console.log("render"); 
    return(
        <div>
            <h2>Profile Component</h2>
            <h3>Name:{props.name}</h3>
            <h3>Count:{count}</h3>
            <button onClick={() => {setCount(1);
            }}>

            </button>
        </div>
    );
};

export default Profile;