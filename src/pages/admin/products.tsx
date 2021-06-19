import axios from "axios";
import cookie from "cookie"
const jwt = require("jsonwebtoken")
import Layout from '../../Layout';
import React from "react";
import ProductTable from "../../components/Admin/Products/ProductTable"

interface IUser{
    user:{
        name:string
    }
}
const Products:React.FC<IUser> = ({user}) =>{
    return(
        <Layout user={user}>
            <h1>Products</h1>
            <ProductTable/>
        </Layout>
    )
}

export async function getServerSideProps({req,res}){
    const {token} = cookie.parse(req.headers.cookie || "");
    if(token)
    {
        const {role,...user} = jwt.verify(token,process.env.TOKEN_KEY);
        try{
            const [stocks] = await axios.all(
            [
                 axios.get('http://localhost:3000/api/inventory',
                        {
                            headers:{"authorization":`Bearer ${token}`}
                        }
                    )
            ]);
        return{
            props:{
               stocks:stocks.data,
               user
            }
        }
        }catch(error){
            return{
                redirect:{
                    destination:"/",
                    permanent:false
                }
            }
        }
    }
}
export default Products;