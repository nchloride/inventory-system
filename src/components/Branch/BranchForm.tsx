import {useForm} from "react-hook-form";
import React from "react";

export const BranchForm  = ({setRefreshTable})=>{
    const {handleSubmit,register,reset} = useForm<FormData>();
    interface IData {
        name:string,
        location:string,
        branch:string,
    }
    const onSubmit = async (data:IData) =>{
        console.log(data);
        try{
            const response = await fetch("/api/stores",{
                method:"POST",
                mode:"cors",
                body:JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            reset();
            setRefreshTable((prevData:boolean)=>!prevData);
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
