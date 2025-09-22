import {createContext} from 'react'

const UserContext = createContext({
    user:{
        name: "Dummy Name",
        email: "dummyname@gmail.com",    
    },
    
});
export default UserContext;