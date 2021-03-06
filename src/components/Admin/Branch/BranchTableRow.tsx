import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EmployeeService from '../../../utils/service/EmployeeService';
import EditIcon from '@material-ui/icons/Edit';
import {BranchContext} from "../../../pages/admin/branch"
import React, { useState,useEffect, useContext } from 'react';
import UpdateForm from './UpdateForm';
import { useRouter } from 'next/router';
import {CookieContext} from "../../../utils/context/CookieContext"
interface IStore {
    _id:string;
    branch:string;
    location:string;
    employeeCount:number;
    status:string
}

const BranchTableRow = ({store,handleDelete}) => {
    const token = useContext(CookieContext);
    const router = useRouter();
    const {_id,branch,location,status}:IStore = store;
    const [openUpdateForm,setOpenUpdateForm] = useState<boolean>(false);
    const [employeeCount,setEmployeeCount] = useState<number>();
    const employeeService = new EmployeeService(router,token);
    const deleteOnClick = () =>{
        handleDelete(store._id,store.branch);
    }
    const updateOnClick = ()=>{
        setOpenUpdateForm(true);
    }
    useEffect(() => {
        (()=>{
            employeeService.getEmployees().then(data=>{
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
                <td >
                    <h1 style={{backgroundColor:status==="active"?"#00d924":"#fc9403"}}>
                        {status[0].toUpperCase() + status.slice(1,status.length)}
                    </h1>
                </td>
                <td>
                    <button onClick={deleteOnClick} className="delete_button" ><DeleteForeverIcon/></button>
                    <button onClick={updateOnClick}  className="edit_button"><EditIcon/></button>
                </td>
            </tr>
            
            {openUpdateForm && <UpdateForm store={store}  setOpenUpdateForm ={setOpenUpdateForm} openUpdateForm={openUpdateForm}/>}
    
        </>
    )
}

export default BranchTableRow
