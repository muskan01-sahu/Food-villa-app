import React from 'react';
class Profile extends React.Component{

    // constructor(props){
    //     super(props);
    //     this.state={
    //         count:0,
    //         count2:0,
    //     }
    //     console.log("constructor"+ this.props.name);
    // }

    // componentDidMount(){
    //     //Api call
    //     console.log("componentDidMount"+ this.props.name)
    // }

    // render(){
    //      const {count} = this.state;
    //      console.log("render"+ this.props.name);
    //     return(
    
    //     <div>
    //         <h1>Profile Class Component</h1>
    //         <h2>Name:{this.props.name}</h2>
    //         <h2>Name:{this.props.xyz}</h2>
    //         <h2>Count:{count}</h2>
    //         <button onClick={() =>{
    //             //we dont mutate state directly
    //             // never do this.state=something
    //             this.setState({
    //             count:1,
                
    //         });
    //         }}>
    //             SetCount
    //         </button>
    //     </div>
    //     );
  
    // }

     constructor(props){
        super(props);
        this.state = {
            userInfo:{
                name:"Dummy Name",
                location:"Dummy location",
            }
        }
        console.log("constructor"+ this.props.name);
    }

    // async componentDidMount(){
    //      console.log("componentDidMount"+ this.props.name)
    
    //     //Api call
    //      const data= await fetch("https://api.github.com/users/muskan01-sahu");
    //     const json = await data.json();
    //      console.log(json);
    
    //     this.setState({
    //         userInfo:json,
    //     })
    // //     console.log("componentDidMount"+ this.props.name)
    // }

    // componentDidUpdate(){
    //     console.log("component Did update");
    // }
    componentDidMount(){

        this.timer =setInterval(() =>{
            console.log("Namaste react Op");
        },1000);

        console.log("component Did update");
    }

    componentDidUpdate(prevProps, prevState){
        // if there is two useaEffect in functioncsl
        if(
            this.state.count != prevState.count||
            this.state.count != prevState.count
        )
        {
            //code
        }
         if(
            this.state.count2 != prevState.count2
        )
        {
            //code
        }
        console.log("component Did update");
    }

    // componentWillUnmount(){
    //     console.log("component will unmount");
    // }

    componentWillUnmount(){
        clearInterval(this.timer);
        console.log("component will unmount");
    }

    render(){
         const {count} = this.state;
         console.log("render"+ this.props.name);
        return(
    
        <div>
            <h1>Profile Class Component</h1>
            <img src={this.state.userInfo.avatar_url}/>
            <h2>Name:{this.state.userInfo.name}</h2>
            <h2>location:{this.state.userInfo.location}</h2>
           
        </div>
        );
  
    }
}

export default Profile;