import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import Layout from '../../Layout';
import cookie from "cookie";
import { log } from 'console';
import axios from 'axios';
const jwt = require("jsonwebtoken");
const Index = ({stocks = []}) => {
    const pendingStocks= stocks.filter(stock=> !stock.submittedBy) 
    useEffect(()=>{
        console.log(pendingStocks);
        
    },[])
    return (
        <Layout>
            <div className="tab dashboard">
                <h1>Welcome to admin page</h1>
                <div className="dashboard_status_cards">
                    <section className="pending card">
                        <h1>Pending Inventory</h1>
                        <p>{pendingStocks.length}</p>
                    </section>
                    <section className="pending card">
                        <h1>Pending Inventory</h1>
                        <p>{pendingStocks.length}</p>
                    </section>
                    <section className="pending card">
                        <h1>Pending Inventory</h1>
                        <p>{pendingStocks.length}</p>
                    </section>
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({req,res})=>{
    const {token} = cookie.parse(req.headers.cookie || " ");
    if(token){
        const employee = await jwt.verify(token,process.env.TOKEN_KEY);
        if(employee.role === "admin"){
            const stocks = await (await axios.get("http://localhost:3000/api/inventory")).data;
            return{
                props:{
                    stocks
                }
            }
        }         
    }
    return{
        redirect:{
            destination:`/`,
            permanent:false
        }
    }
    
 }

export default (Index);
