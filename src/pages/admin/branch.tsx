import React from "react";
import { BranchTable } from "../../components/Admin/Branch/BranchTable";
import BranchForm from "../../components/Admin/Branch/BranchForm";
import { useRefreshTable } from "../../components/customHooks/useRefreshTable";
import Layout from "../../Layout/"
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import axios from "axios";


export const Branch = ({stores,employees}) => {
    const [refreshTable,setRefreshTable]  = useRefreshTable(false);
    return (
        <Layout>
            <div className="tab branch">
                <h1>Branch Page</h1>
                <BranchTable stores={stores} employees={employees}/> 
                <BranchForm />
            </div>
        </Layout>
    )
}
export const getServerSideProps:GetServerSideProps = async (context) =>{
    const stores = await axios.get("http://localhost:3000/api/stores");
    const employees = await axios.get("http://localhost:3000/api/employees");   
    return{
        props:{
            stores:stores.data,
            employees:employees.data
        }
    }
}
export default Branch;