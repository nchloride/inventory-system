import React, { useState } from 'react'

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
    return (
        <tr>
            <td>{name}</td>
            <td>{username}</td>
            <td>{address}</td>
            <td>{branch}</td>
            <td>{rate}</td>
            <td>{role}</td>
            <td>
                <button onClick={()=>handleDelete(_id,name)}>Delete</button>
                <button>Update</button>
            </td>
        </tr>
    )
}

export default EmployeeTableRow
