import { useRefreshTable } from "../../components/customHooks/useRefreshTable";
import EmployeeForm from "../../components/Employee/EmployeeForm";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import Layout from "../../Layout";


export default function Employees(){
    
    const [refresh,setRefresh] = useRefreshTable(false);
    
    return(
        <Layout>
            <div className="tab employees">
                <h1>Employees page</h1>
                <EmployeeTable refresh={refresh}  setRefresh={setRefresh} />
                <EmployeeForm refresh={refresh} setRefresh={setRefresh} />
            </div>
        </Layout>
    )
}