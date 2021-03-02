import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import React, { useEffect, useState,useContext } from 'react';
import {useForm} from "react-hook-form";
import EmployeeController from '../../../utils/controllers/EmployeeController';
import StoreController from "../../../utils/controllers/StoreController"



const EmployeeForm = ({stores}) => {
    const router = useRouter();
    const {errors,handleSubmit,register,reset} = useForm();
    const employeeController = new EmployeeController(router);
    const [inputError,setInputError] = useState({
        alreadyExist:false,
    })
    enum Roles{
        'admin',
        'employee'
    }
    interface IEmployee{
        name:string,
        address:string,
        branch:string,
        rate:number,
        password:string,
        username:string,
        role:Roles
    }
    const onFormSubmit = (data:IEmployee) =>{
        employeeController.setEmployee(data).then(data=>{
            if(data.added){
                reset();
                setInputError({alreadyExist:false});
            }
            else{
                setInputError({alreadyExist:true});
            }
        });
        
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="input__form employee__form">
            <input type="text" name="name" placeholder="Name" ref={register({required:true})} ></input>
            <input type="text" name="address" placeholder="Address" ref={register({required:true})} ></input>
            <input type="text" name="username" placeholder="Username" ref={register({required:true,pattern:/^[a-zA-Z0-9]*$/})} ></input>
            <input type="password" name="password" placeholder="Password" ref={register({required:true,pattern:/^[a-zA-Z0-9]*$/})} ></input>
            <select name="branch" placeholder="Branch"
             ref={register({required:true,validate:{
                notNull:(value:string)=>value!=="0"
            }})}>
                 <option value="0">---Select a branch---</option>
                {stores.map((store)=>(
                    <option value={store.branch} key={store._id}>{store.branch}</option>
                ))}
            </select>
            <select name="role" placeholder="Role"
             ref={register({required:true,validate:{
                notNull:(value:string)=>value!=="0"
            }})}>
                 <option value="0">---Select Role---</option>
                 <option value="admin">Admin</option>
                 <option value="employee">Employee</option>
            </select>
            <input type="number" name="rate" placeholder="Rate" ref={register({required:true})}></input>
            <input type="submit" value="Add employee"></input>
            {inputError.alreadyExist &&"Employee already exist"}
        </form>
    )
}

export default EmployeeForm
