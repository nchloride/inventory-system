import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import { BranchTable } from "../../components/Admin/Branch/BranchTable";
import BranchForm from "../../components/Admin/Branch/BranchForm";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Layout from "../../Layout/"
import React, { useState } from "react";
import { useRefreshTable } from "../../components/customHooks/useRefreshTable";
import cookie from "cookie"
import { withAuth } from '../../lib/withAuth';

export const Branch = ({stores,employees}) => {
    const [openAddForm,setOpenAddForm] = useState<boolean>(false);
    return (
            <Layout>
                <div className="tab branch">
                    <div className="tab_title">
                        <h1>Branch Page</h1>
                        <button onClick={()=>setOpenAddForm(true)} className="add_data"><AddIcon/>Add Branch</button>
                    </div>
                    <BranchTable stores={stores} employees={employees}/> 
                    {openAddForm && <BranchForm open={openAddForm} setClose={setOpenAddForm}/>}
                </div>
            </Layout>
        )

}
export const getServerSideProps = async ({req,res}) =>{
    const {token} = cookie.parse(req.headers.cookie);
    const stores:any = await axios.get("http://localhost:3000/api/stores",
                            {headers:{"authorization":`Bearer ${token}`}});
    const employees = await axios.get("http://localhost:3000/api/employees");   

    return{
        props:{
            stores:stores.data,
            employees:employees.data
        }
    }
}
export default Branch;