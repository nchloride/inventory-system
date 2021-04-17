import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EmployeeController from '../../../utils/controllers/EmployeeController';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState,useEffect, useContext } from 'react';
import UpdateForm from './UpdateForm';
import { useRouter } from 'next/router';
import {CookieContext} from "../../../utils/context/CookieContext"
interface IStore {
    _id:string;
    branch:string;
    location:string;
    employeeCount:number;
}

const BranchTableRow = ({store,handleDelete}) => {
    const token = useContext(CookieContext);
    const router = useRouter();
    const {_id,branch,location}:IStore = store;
    const [openUpdateForm,setOpenUpdateForm] = useState<boolean>(false);
    const [employeeCount,setEmployeeCount] = useState<number>();
    const employeeController = new EmployeeController(router,token);
    const deleteOnClick = () =>{
        handleDelete(store._id,store.branch);
    }
    const updateOnClick = ()=>{
        setOpenUpdateForm(true);
    }
    useEffect(() => {
        (()=>{
            employeeController.getEmployees().then(data=>{
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
                    <button onClick={deleteOnClick} className="delete_button" ><DeleteForeverIcon/></button>
                    <button onClick={updateOnClick}  className="edit_button"><EditIcon/></button>
                </td>
            </tr>
            {openUpdateForm && <UpdateForm store={store}  setOpenUpdateForm ={setOpenUpdateForm} openUpdateForm={openUpdateForm}/>}
    
        </>
    )
}

export default BranchTableRow
