import {Outlet} from 'react-router-dom';
import ProfileFunctionalComponent from "./Profile";
import Profile from "./ProfileClass";
import {Component} from "react";

// const About = () => {
//     return(
//         <div>
//             <h1>About Us Page</h1>
//             <p>This is the namaste react Live Course Chapter 07 - Finding the path</p>
//             <ProfileFunctionalComponent name= {"Muskan"}/>
//             <Profile name= {"gfdfgdfgd"} xyz={"abs"}/>
//        </div> 
//     );
// };

class About1 extends Component{

    constructor(props){
        super(props);
       
        console.log("parent-constructor");
    }

    componentDidMount(){
        //bests place for API call
      
        console.log("parent-componentDidMount");
    }

    render(){
        console.log("parent-render");
        return(
            <div>
                <h1>About Us Page</h1>
                <p>This is the namaste react Live Course Chapter 07 - Finding the path</p>
                <Profile name= {"first child"} xyz={"abs"}/>
                {/* <Profile name= {"second-child"} xyz={"abs"}/> */}
            </div> 
    );
    }
}
  

export default About1;