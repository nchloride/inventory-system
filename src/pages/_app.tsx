import '../styles/globals.css';
import "./global-styles/nav.css";
import "./global-styles/layout.css";
import "./global-styles/table.css";
// Tab
import "./global-styles/tab.css";
// Form
import "./global-styles/form.css";
//Branch Styles 
import "./global-styles/branch/index.css";
import "./global-styles/branch/form.css";
//Employees Styles
import "./global-styles/employees/index.css";
import "./global-styles/employees/form.css";
//Inventory Styles
import "./global-styles/inventory/index.css"
//Dashboard Styles
import "./global-styles/dashboard/dashboard.css"
//Login Form 
import "./global-styles/login.css"
//Modal
import "./global-styles/modal.css"


import Cookie from "cookie";
import {CookieContext} from "../utils/context/CookieContext";
import {createContext, useEffect} from "react";



function MyApp({ Component, pageProps, token }) {
 
   
   <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap" rel="stylesheet"></link>
   return (
      <CookieContext.Provider value ={token}>
         <Component {...pageProps} />
      </CookieContext.Provider>
      )
}
MyApp.getInitialProps  = async ({ctx}) =>{
   const {token} = Cookie.parse(ctx.req.headers.cookie || "");
   return{
      token
   }
   
}
export default MyApp
