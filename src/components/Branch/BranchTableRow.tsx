import React, { useState,useEffect } from 'react';
import employeeHandler from '../../utils/employeeHandler';
import UpdateForm from './UpdateForm';

interface IStore {
    _id:string;
    branch:string;
    location:string;
    employeeCount:number;
}

const BranchTableRow = ({store,handleDelete}) => {
    const {_id,branch,location}:IStore = store;
    const [openUpdateForm,setOpenUpdateForm] = useState<boolean>(false);
    const [employeeCount,setEmployeeCount] = useState<number>();
    const deleteOnClick = () =>{
        handleDelete(store._id,store.branch);
    }
    const updateOnClick = ()=>{
        setOpenUpdateForm(true);
    }
    useEffect(() => {
        (()=>{
            employeeHandler.getEmployees().then(data=>{
                const storeEmployeeCount = data.filter(employee=> employee.branch === store.branch).length;
                setEmployeeCount(storeEmployeeCount);
            })
        })()
    }, [])
    return (
        <>
            <tr key={_id}>
                <td>{branch}</td>
                <td>{location}</td>
                <td>{employeeCount}</td>
                <td>
                    <button onClick={deleteOnClick} >Delete</button>
                    <button onClick={updateOnClick}>Update</button>
                </td>
            </tr>
            {openUpdateForm && <UpdateForm store={store} setOpenUpdateForm ={setOpenUpdateForm} openUpdateForm={openUpdateForm}/>}
    
        </>
    )
}

export default BranchTableRow
