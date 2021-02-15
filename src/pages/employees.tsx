import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeTable from "../components/Employee/EmployeeTable";

export default function Employees(){
    return(
        <div className="tab employees">
            <h1>Employees page</h1>
            <EmployeeTable/>
            <EmployeeForm/>
          
        </div>
    )
}