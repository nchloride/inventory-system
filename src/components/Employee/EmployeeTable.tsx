import React, { useState,useEffect } from 'react'
import EmployeeHandler from '../../utils/employeeHandler';
import EmployeeTableRow from './EmployeeTableRow';

const EmployeeTable = () => {
    const [employees,setEmployees] = useState([]);
    useEffect(() => {
        (async()=>{
            const employeeData = await EmployeeHandler.getEmployees();
             setEmployees(employeeData);
            
        })()
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Branch</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody> 
                {employees.map(employee=>(
                    <EmployeeTableRow key={employee._id} employee={employee} />
                ))}
            </tbody>
        </table>
    )
}

export default EmployeeTable
