import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import EmployeeForm from "../../components/Admin/Employee/EmployeeForm";
import EmployeeTable from "../../components/Admin/Employee/EmployeeTable";
import Layout from "../../Layout";
import { useState } from "react";
import TokenController from '../../utils/controllers/TokenController';


export default function Employees({employees,stores}){
    const [openModal,setOpenModal] = useState<boolean>(false)
    return(
        <Layout>
            <div className="tab employees">
                <div className="tab_title">
                    <h1>Employees page</h1>
                    <button onClick={()=>setOpenModal(true)} className="add_data"><AddIcon/>Add Employee</button>
                </div>
                <EmployeeTable employees = {employees} />
                <EmployeeForm stores={stores} openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </Layout>
    )
}
export async function getServerSideProps(ctx){
    const employees = await axios.get("http://localhost:3000/api/employees",
        {headers:{
            "Authorization":"Okay"
        }});
    const stores = await axios.get("http://localhost:3000/api/stores");


    return{
        props:{
            employees:employees.data,
            stores:stores.data
        }
    }
}