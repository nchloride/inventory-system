import React from 'react'

interface IEmployee{
    employee:{
        name:string,
        branch:string,
        rate:number,
        address:string
    }
}
const EmployeeTableRow = ({employee}:IEmployee) => {
    const {name,address,branch,rate} = employee;
    return (
        <tr>
            <td>{name}</td>
            <td>{address}</td>
            <td>{branch}</td>
            <td>{rate}</td>
            <td>
                <button>Delete</button>
                <button>Update</button>
            </td>
        </tr>
    )
}

export default EmployeeTableRow
