import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Login from "../components/Login";


export const Layout = ({children})=>{


        return (
            <div className="layout">
                <NavigationBar/>
                {children}
            </div>
        )
    

    
}

export default Layout;