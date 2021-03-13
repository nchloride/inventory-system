import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../Layout';
import cookie from "cookie";
import jwt from "jsonwebtoken";
const Index = () => {
    return (
        <Layout>
            <h1>Welcome to admin page</h1>
        </Layout>
    )
}
// export const getServerSideProps = async ({req,res})=>{
//     const parsedCookie = cookie.parse(req.headers.cookie || "" );
//     const isAuthenticated = parsedCookie.token !== " " ;
//     if(isAuthenticated){
//         return{
//             redirect:{
//                 destination:'/'
//             }
//         }
//     }
//      return{
//          props:{}
//      }
//  }
export default (Index);
