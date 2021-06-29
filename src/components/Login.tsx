
import {useRouter} from "next/router";
import React, { useEffect, useRef,useState } from 'react';
import RoutesController from '../utils/service/RoutesController';
import {useForm} from "react-hook-form";


const Login = () => {
    const router = useRouter();
    const routesHandler = new RoutesController(router);
    const [error,setError] = useState<string>("");
    const [authenticating,setAuthenticating] = useState<boolean>(false);
    const {handleSubmit,register} = useForm(); 
    const authenticateUser = (data) =>{
        setAuthenticating(true);
        fetch("/api/auth",{
            method:'POST',
            mode:"cors",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                data
            })
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.token){
                 routesHandler.redirectRoute(data.token);
                setError("");
            }else{
                setAuthenticating(false);
                setError("Incorrect username or password");
            }
        });
    }

          
    return (
        <div className="login_page">
            <form onSubmit={handleSubmit(authenticateUser)} className="login__form">
                <h1>FavBurrito</h1>
                <input type="text" placeholder="Username" name="username" ref={register({required:true})}></input>
                <input type="password" placeholder="Password" name="password" ref={register({required:true})}></input>
                {authenticating? 
                    <div className="login_loading">
                        <div className="dots" style={{order:1}}></div>
                        <div className="dots" style={{order:2}}></div>
                        <div className="dots" style={{order:3}}></div>
                    </div> : 
                    <input type="submit" value="Log In"/>
                }
                <h2><strong>{error}</strong></h2>
            </form>
         
        </div>
    )

}

export default Login
