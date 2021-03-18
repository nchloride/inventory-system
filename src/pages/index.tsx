import Head from 'next/head'
import Login from '../components/Login';
import {NextRouter, useRouter} from "next/router"
import cookie from "cookie"
import { useEffect } from 'react';
const jwt = require("jsonwebtoken");



export default function Home(){


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
            redirect:{
              destination:`/${employee.role}`,
              permanent:false
            }
         }
      } 
       
   }
   return{
       props:{},
   }
   
}