import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../Layout';
import cookie from "cookie";
const jwt = require("jsonwebtoken");
const Index = () => {
    return (
        <Layout>
            <h1>Welcome to admin page</h1>
        </Layout>
    )
}
// export const getServerSideProps = async ({req,res})=>{
//     const parsedCookie = cookie.parse(req.headers.cookie || "" );
//     if(parsedCookie.token){
//         const employee = await jwt.verify(parsedCookie.token,process.env.TOKEN_KEY);
//         if(employee.role){
//           return{
//                redirect:{
//                    destination:`/${employee.role}`,
//                    permanent:false
//                }
//            }
//         } 
//     }
//         console.log("No cookie");
//         return{
//             props:{
    
//             },
//             redirect:{
//                 destination:`/`,
//                 permanent:false
//             }
//         }
    
//  }

export default (Index);
