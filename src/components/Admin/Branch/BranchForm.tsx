import {useForm} from "react-hook-form";
import React from "react";
import StoreController from "../../../utils/controllers/StoreController";
import { useRouter } from "next/router";
export const BranchForm  = ()=>{
    const router = useRouter();
    const storeController = new StoreController(router);
    const {handleSubmit,register,reset} = useForm<FormData>();
    interface IData {
        name:string,
        location:string,
        branch:string,
    }
    const onSubmit = async (data:IData) =>{
        try{
            storeController.addStore(data).then(_=>{
                reset();
            })
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="input__form branch__form">
            <input name="branch"
            type="text" 
            ref={register({required:true})}
            placeholder="Enter branch name"
            />
            <input name="location"
            type="text" 
            ref={register({required:true})}
            placeholder="Enter branch location"
            />
            <input type="submit" value="Add store"/>
        </form>
    )
}
BranchForm.getInitialProps = ({setRefreshTable}) =>{
    return{
        props:{
            setRefreshTable
        }
    }
}
export default BranchForm;
