import Head from 'next/head'
import Login from '../components/Login';
import {NextRouter, useRouter} from "next/router"
import cookie from "cookie"
import { useEffect } from 'react';
const jwt = require("jsonwebtoken");

const Redirect = ({to}) =>{
  const router = useRouter();

  useEffect(() => {
    router.push(`/${to}`);
    console.log(to);
  }, [])
  return <h1>Loading...</h1>
}

export default function Home({page,isAuthenticated}){
  useEffect(() => {
    console.log(page,isAuthenticated);
    
  }, [])
  if(isAuthenticated) return <Redirect to={page}/>
  
  return (
    <Login/>
  )
}


export const getServerSideProps = async ({req,res})=>{
  const parsedCookie = cookie.parse(req.headers.cookie || "" );
  if(parsedCookie.token){
    const employee = await jwt.verify(parsedCookie.token,process.env.TOKEN_KEY);
      if(employee){
        return{
            props:{
              page: employee.role,
              isAuthenticated:true
            }
         }
      } 
       
   }
   return{
       props:{},
   }
   
}