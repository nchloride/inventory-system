import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import EmployeeHandler from '../../utils/employeeHandler';
import Stores from "../../utils/storesHandler"
// name,dateHired,address,storeBranch,rate
const EmployeeForm = ({setRefresh}) => {
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
                setRefresh(prevBool=>!prevBool);
            }
            else{
                setInputError({alreadyExist:true});
            }
        });
        
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="input__form employee__form">
            <input type="text" name="name" ref={register({required:true})} ></input>
            <input type="text" name="address" ref={register({required:true})} ></input>
            <select name="branch" ref={register({required:true})}>
                {stores.map((store)=>(
                    <option value={store.branch} key={store._id}>{store.branch}</option>
                ))}
            </select>
            <input type="number" name="rate" ref={register({required:true})}></input>
            <input type="submit" value="Add employee"></input>
            {inputError.alreadyExist &&"sdfsdf"}
        </form>
    )
}

export default EmployeeForm
