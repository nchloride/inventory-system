import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import { BranchTable } from "../../components/Admin/Branch/BranchTable";
import BranchForm from "../../components/Admin/Branch/BranchForm";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Layout from "../../Layout/"
import React, {useState,createContext,useContext} from "react";
import { useRefreshTable } from "../../components/customHooks/useRefreshTable";
import cookie from "cookie";
const jwt = require('jsonwebtoken');
import BranchService from "../../utils/service/BranchService";
import { useRouter } from 'next/router';
import {CookieContext} from "../../utils/context/CookieContext"
export const BranchContext = createContext(null);

export const Branch = ({stores,employees,user}) => {
    const token = useContext(CookieContext);
    const router = useRouter();
    const StoreController = new BranchService(router,token);
    const [openAddForm,setOpenAddForm] = useState<boolean>(false);
    return (
            <Layout user={user}>
                <div className="tab branch">
                    <div className="tab_title">
                        <h1>Branch Page</h1>
                        <button onClick={()=>setOpenAddForm(true)} className="add_data"><AddIcon/>Add Branch</button>
                    </div>
                    <BranchContext.Provider value={StoreController}>
                        <BranchTable stores={stores} employees={employees}/> 
                        {openAddForm && <BranchForm open={openAddForm} setClose={setOpenAddForm}/>}
                    </BranchContext.Provider>
                </div>
            </Layout>
        )

}
export const getServerSideProps = async <T extends GetServerSideProps>({req,res}) =>{
    const redirectToLogin = {
        redirect:{
            destination:"/",
            permanent:false
        }
    }
        const {token} = cookie.parse(req.headers.cookie || " ");
        if(token){  
            const {role,...user} = jwt.verify(token,process.env.TOKEN_KEY);
            if(role ==="admin"){
                const stores:any = await axios.get("http://localhost:3000/api/stores",
                                        {headers:{"authorization":`Bearer ${token}`}});
                const employees = await axios.get("http://localhost:3000/api/employees");   
                return{
                    props:{
                        stores:stores.data,
                        employees:employees.data,
                        user
                    }
                }
            }
        }
        return redirectToLogin;
    
}
export default Branch;