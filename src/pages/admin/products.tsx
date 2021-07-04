import axios from "axios";
import cookie from "cookie"
const jwt = require("jsonwebtoken")
import Layout from '../../Layout';
import React from "react";
import ProductTable from "../../components/Admin/Products/ProductTable"
import ProductForm from "../../components/Admin/Products/ProductForm";

type ProductsType = {
    name:string,
    price:number,
    stocks:number
}
interface IUser{
    user:{
        name:string
    }
    products:ProductsType[]
}
const Products:React.FC<IUser> = ({user,products}) =>{
    return(
        <Layout user={user}>
            <div className="tab products">
                <div className="tab_title">
                    <h1 >Products</h1>
                </div>
                <ProductForm/>
                <ProductTable products={products}/>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({req,res}){
    const {token} = cookie.parse(req.headers.cookie || "");
    const redirect = {
        redirect:{
            destination:"/",
            permanent:false
        }
    }
    if(token)
    {
        const {role,...user} = jwt.verify(token,process.env.TOKEN_KEY);
        try{
            const [products] = await axios.all(
            [
                 axios.get('http://localhost:3000/api/products',
                        {
                            method:"GET",
                            headers:{"authorization":`Bearer ${token}`}
                        }
                    )
            ]);
        return{
            props:{
                products:products.data,
                user
            }
        }
        }catch(error){
            return redirect
        }
    }
    return redirect
}
export default Products;