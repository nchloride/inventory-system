import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import EmployeeForm from "../../components/Admin/Employee/EmployeeForm";
import EmployeeTable from "../../components/Admin/Employee/EmployeeTable";
import Layout from "../../Layout";
import { useState,useContext,createContext } from "react";
import {CookieContext} from "../../utils/context/CookieContext";
import EmployeeController from "../../utils/controllers/EmployeeController";
import { useRouter } from 'next/router';
import cookie from "cookie"
const jwt = require("jsonwebtoken");

export const EmployeeService = createContext(null);
export default function Employees({employees,stores,user}){
    const [openModal,setOpenModal] = useState<boolean>(false);
    const router = useRouter()
    const token = useContext(CookieContext);
    const employeeController = new EmployeeController(router,token);
    return(
        <EmployeeService.Provider value = {employeeController}>
            <Layout user={user}>
                <div className="tab employees">
                    <div className="tab_title">
                        <h1>Employees page</h1>
                        <button onClick={()=>setOpenModal(true)} className="add_data"><AddIcon/>Add Employee</button>
                    </div>
                    <EmployeeTable employees = {employees} />
                    <EmployeeForm stores={stores} openModal={openModal} setOpenModal={setOpenModal} />
                </div>
            </Layout>
        </EmployeeService.Provider>
    )
}
export async function getServerSideProps({req,res}){
    const {token} = cookie.parse(req.headers.cookie || "");
    if(token){
        const {role,...user} = jwt.verify(token,process.env.TOKEN_KEY);
        if(role === "admin"){
            const employees = await axios.get("http://localhost:3000/api/employees");
            const stores = await axios.get("http://localhost:3000/api/stores",
                            {headers:{"Authorization":`Bearer ${token}`}});
            return{
                props:{
                    employees:employees.data,
                    stores:stores.data,
                    user
                }
            }
        }
    }
    return{
        redirect:{
            destination:"/",
            permanent:false
        }
    }

}