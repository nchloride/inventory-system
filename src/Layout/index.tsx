import { useEffect } from "react";
import NavigationBar from "../components/Admin/NavigationBar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const Layout = ({children,user})=>{
    return (
        <div className="layout">
            <div className="layout_header">
                <AccountCircleIcon className="logo"/>
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