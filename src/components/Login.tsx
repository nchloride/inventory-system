import { log } from 'console';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'


const Login = ({setIsLogin,setRole}) => {
    const router = useRouter();
    const inputBox = useRef(null);
    const authenticateUser = () =>{
        // if(inputBox.current.value==="login"){
        //     setIsLogin(true);
        //     setRole("admin");
        // }
        // else if(inputBox.current.value==="employee"){
        //     setIsLogin(true);
        //     setRole('employee');
        // }
        fetch("/api/auth",{
            method:'POST',
            mode:"cors",
            body:JSON.stringify({
                name:inputBox.current.value
            })
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.authenticated){
                router.push("/admin");
                setRole("admin");
                setIsLogin(true);
            }
        });
        
    }
    return (
        <div>
            <input ref={inputBox} type="text" name='bobo'></input>
            <button onClick={authenticateUser}>sd</button>
        </div>
    )
}

export default Login
