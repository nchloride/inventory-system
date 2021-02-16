import { useRefreshTable } from "../components/customHooks/useRefreshTable";
import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeTable from "../components/Employee/EmployeeTable";

export default function Employees(){
    const [refresh,setRefresh] = useRefreshTable(false);
    
    return(
        <div className="tab employees">
            <h1>Employees page</h1>
            <EmployeeTable refresh={refresh}/>
            <EmployeeForm setRefresh={setRefresh}/>
          
        </div>
    )
}