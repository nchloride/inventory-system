import {createContext, useEffect} from "react";

export const CookieContext = createContext("");


// export const CookieProvider = (props) =>{
//     useEffect(()=>{
//         console.log(props.cookie);
        
//     },[])
//     return(
//         <CookieContext.Provider value={"tute"}>
//             {props.children}
//         </CookieContext.Provider>
//     )
// }