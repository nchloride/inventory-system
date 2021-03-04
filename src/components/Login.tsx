
import {useRouter} from "next/router";
import React, { useEffect, useRef } from 'react';
import {useForm} from "react-hook-form";
import RoutesController from '../utils/controllers/RoutesController';
import TokenController from "../utils/controllers/TokenController";



const Login = () => {
    const router = useRouter();
    const routesHandler = new RoutesController(router);
    useEffect(()=>{
        if(TokenController.getCookie){
            routesHandler.redirectRoute(TokenController.getCookie);
        }
    },[]);

    const {handleSubmit,register} = useForm(); 
    const authenticateUser = (data) =>{
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
            }
        });
        
    }
    
    return (
        <form onSubmit={handleSubmit(authenticateUser)} className="login__form">
            <h1>FavBurrito</h1>
            <input type="text" placeholder="Username" name="username" ref={register({required:true})}></input>
            <input type="password" placeholder="Password" name="password" ref={register({required:true})}></input>
            <input type="submit"></input>
        </form>
    )
}

export default Login
