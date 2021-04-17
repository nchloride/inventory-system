import { useRouter } from 'next/router';
import React, { useState,useEffect,useContext } from 'react'
import EmployeeController from '../../../utils/controllers/EmployeeController';
import EmployeeTableRow from './EmployeeTableRow';
import {EmployeeService} from "../../../pages/admin/employees"


const EmployeeTable = ({employees}) => {
    const employeeHandler = useContext(EmployeeService);
    const router = useRouter()

    const handleDelete = (id:string,name:string)=>{
        if(confirm("Are you sure?")){
            if(prompt(`Please type ${name} to continue`))
                employeeHandler.deleteEmployee(id);
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Branch</th>
                    <th>Rate</th>
                    <th>Role</th>
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
