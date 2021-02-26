
import {useRouter} from "next/router";
import React, { useRef } from 'react';
import RoutesHandler from '../utils/routesHandler';



const Login = () => {
    const router = useRouter();
    const inputBox = useRef(null);
    const authenticateUser = () =>{
        fetch("/api/auth",{
            method:'POST',
            mode:"cors",
            body:JSON.stringify({
                name:inputBox.current.value
            })
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.token){
                // router.push("/admin");
                const routesHandler = new RoutesHandler(router);
                routesHandler.redirectRoute(data.token);
            }
        });
        
    }
    return (
        <div>
            <input ref={inputBox} type="text" name='bobo'></input>
            <button onClick={authenticateUser}>Submit</button>
        </div>
    )
}

export default Login
