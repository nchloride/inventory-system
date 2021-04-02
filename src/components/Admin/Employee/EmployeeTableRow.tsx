import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react'
import EmployeeUpdateForm from './UpdateForm';
interface IEmployee{
    employee:{
        _id:string,
        name:string,
        branch:string,
        rate:number,
        address:string
        username:string,
        password:string,
        role:['admin','employee'];
    },
    handleDelete?:any
}
const EmployeeTableRow = ({employee,handleDelete}:IEmployee) => {
    const {_id,name,address,branch,rate,username,role} = employee;
    const [isOpen,setIsOpen] = useState<boolean>(false);

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{username}</td>
                <td>{address}</td>
                <td>{branch}</td>
                <td>{rate}</td>
                <td>{role}</td>
                <td>
                    <button onClick={()=>handleDelete(_id,name)}  className="delete_button"><DeleteForeverIcon/></button>
                    <button onClick={()=>setIsOpen(true)} className="edit_button"><EditIcon/></button>
                </td>
            </tr>
            <EmployeeUpdateForm isOpen={isOpen} setIsOpen={setIsOpen} employee={employee}/>
        </>
    )
}

export default EmployeeTableRow
