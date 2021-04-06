import axios from 'axios';
import cookie from "cookie";
import { GetServerSideProps } from 'next';
import isToday from "../../lib/isToday"
import Layout from '../../Layout';
import React, { useEffect,useContext } from 'react';
const jwt = require("jsonwebtoken");
const Dashboard = ({stocks = [],employees=[],stores=[],user}) => {
    const pendingStocks= stocks.filter(stock=> !stock.submittedBy);
    const pendingStocksToday= stocks.filter(stock=> isToday(stock.date));
    const employeeCount = employees.length;
    const storesCount = stores.length;

    return (
        <Layout user={user}>
            <div className="tab dashboard">
                <h1>Dashboard</h1>
                <div className="dashboard_status_cards">
                    <section className="pending card">
                        <h1>Total Employees</h1>
                        <p>{employeeCount}</p>
                    </section>
                    <section className="pending card">
                        <h1>Total Stores</h1>
                        <p>{storesCount}</p>
                    </section>
                    <section className="pending card">
                        <h1>Overall Pending Inventory</h1>
                        <p>{pendingStocks.length}</p>
                    </section>
                    <section className="pending card">
                        <h1>Today's Pending Inventory</h1>
                        <p>{pendingStocksToday.length}</p>
                    </section>
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({req,res})=>{
    const {token} = cookie.parse(req.headers.cookie||"");
    if(token){
        const employee = await jwt.verify(token,process.env.TOKEN_KEY);
        if(employee.role === "admin"){
            const [stocks,employees,stores] = await axios.all([
                axios.get("http://localhost:3000/api/inventory"),
                axios.get("http://localhost:3000/api/employees"),
                axios.get("http://localhost:3000/api/stores",{headers:{"authorization":`Bearer ${token}`}})
            ])
            return{
                props:{
                    stocks:stocks.data,
                    employees:employees.data,
                    stores:stores.data,
                    user:employee
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

export default (Dashboard);
