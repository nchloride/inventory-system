import axios from "axios";
import cookie from "cookie"
const jwt = require("jsonwebtoken")
import Layout from '../../Layout';
import React,{createContext,useContext} from "react";
import {useRouter} from "next/router";
import {CookieContext} from "../../utils/context/CookieContext";
import ProductTable from "../../components/Admin/Products/ProductTable"
import ProductForm from "../../components/Admin/Products/ProductForm";
import ProductsService from "../../utils/service/ProductsService";

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
export const ProductContext = createContext(null);

const Products:React.FC<IUser> = ({user,products}) =>{
    const token = useContext(CookieContext);
    const router = useRouter();
    const productService = new ProductsService(router,token);
    return(
        <ProductContext.Provider value={productService}>
            <Layout user={user}>
                <div className="tab products">
                    <div className="tab_title">
                        <h1 >Products</h1>
                    </div>
                    <ProductForm/>
                    <ProductTable products={products}/>
                </div>
            </Layout>
        </ProductContext.Provider>
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