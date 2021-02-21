import React, { useState,useEffect,useContext } from 'react'
import EmployeeHandler from '../../utils/employeeHandler';
import EmployeeTableRow from './EmployeeTableRow';

const EmployeeTable = ({refresh,setRefresh}) => {
    const [employees,setEmployees] = useState([]);
   
    useEffect(() => {
        (async()=>{
            const employeeData = await EmployeeHandler.getEmployees();
            setEmployees(employeeData);
        })()
    }, [refresh]);
    const handleDelete = (id:string,name:string)=>{
        if(confirm("Are you sure?")){
            if(prompt(`Please type ${name} to continue`))
                EmployeeHandler.deleteEmployee(id).then(_=>{
                    setRefresh((prevData:boolean)=>!prevData);
                });
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Branch</th>
                    <th>Rate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody> 
                {employees.map(employee=>(
                    <EmployeeTableRow key={employee._id} employee={employee} handleDelete={handleDelete} />
                ))}
            </tbody>
        </table>
    )
}

export default EmployeeTable
