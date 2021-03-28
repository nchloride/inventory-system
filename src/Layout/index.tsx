import { useEffect } from "react";
import NavigationBar from "../components/Admin/NavigationBar";

export const Layout = ({children,user})=>{
    useEffect(()=>{
        console.log("user: ",user);
        
    },[])
    return (
        <div className="layout">
            <div className="layout_header">
                <h1>{user.name}</h1>
            </div>
            <div className="layout_main">
                <NavigationBar/>
                {children}
            </div>
        </div>
    )  
}

export default Layout;