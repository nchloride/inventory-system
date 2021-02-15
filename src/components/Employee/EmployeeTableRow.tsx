import React from 'react'

interface IEmployee{
    name:string,
    branch:string,
    rate:number,
    address:string
}
const EmployeeTableRow = ({employee}:IEmployee) => {
    const {name,address,branch,rate} = employee;
    return (
        <tr>
            <td>{name}</td>
            <td>{address}</td>
            <td>{branch}</td>
            <td>{rate}</td>
        </tr>
    )
}

export default EmployeeTableRow
