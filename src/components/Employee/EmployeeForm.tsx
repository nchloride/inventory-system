import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import React, { useEffect, useState,useContext } from 'react';
import {useForm} from "react-hook-form";
import EmployeeHandler from '../../utils/employeeHandler';
import Stores from "../../utils/storesHandler"



const EmployeeForm = ({refresh,setRefresh}) => {
    const router = useRouter();
    const {errors,handleSubmit,register,reset} = useForm();
    const [stores,setStores] = useState([]);
    const [inputError,setInputError] = useState({
        alreadyExist:false,
    })
    interface IEmployee{
        name:string,
        address:string,
        branch:string,
        rate:number,
    }
    useEffect(() => {
        (async()=>{
            setStores(await Stores.getStores());
        })()
    }, [])
    const onFormSubmit = (data:IEmployee) =>{
        EmployeeHandler.setEmployee(data).then(data=>{
            if(data.added){
                reset();
                setInputError({alreadyExist:false});
                setRefresh(!refresh);
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
            <select name="branch" placeholder="Branch"
             ref={register({required:true,validate:{
                notNull:value=>value!=="0"
            }})}>
                 <option value="0">---Select a branch---</option>
                {stores.map((store)=>(
                    <option value={store.branch} key={store._id}>{store.branch}</option>
                ))}
            </select>
            <input type="number" name="rate" placeholder="Rate" ref={register({required:true})}></input>
            <input type="submit" value="Add employee"></input>
            {inputError.alreadyExist &&"Employee already exist"}
        </form>
    )
}

export default EmployeeForm
