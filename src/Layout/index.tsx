import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Login from "../components/Login";
export default ({children})=>{
    const [isLogin,setIsLogin] = useState<boolean>(false);
    const [role,setRole] = useState<string>("");
    if(!isLogin){
        return(
            <Login setIsLogin = {setIsLogin} setRole={setRole}/>
        )
    }
    else if(isLogin && role==="admin"){
        return (
            <div className="layout">
                <NavigationBar/>
                {children}
            </div>
        )
    }
    else if(isLogin && role ==="employee"){
        return(
            <div>
                employee
            </div>
        )    
    }
    
}