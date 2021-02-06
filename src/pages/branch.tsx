import { BranchTable } from "../components/Branch/Table";
import {useForm} from "react-hook-form";

export const Branch = ()=>{
    const {handleSubmit,errors,register} = useForm<FormData>();
    interface IData {
        name:string,
        location:string,
        branch:string,
    }
    const onSubmit = async (data:IData) =>{
        console.log(data);
        const response = await fetch("/api/stores",{
            method:"POST",
            mode:"cors",
            body:JSON.stringify(data),
        })
        const result = await response.json();
        console.log(result);
        
    }
    return (
        <div>
            <BranchTable/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name"
                 type="text" 
                 ref={register({required:true})}
                 />
                <input name="location"
                 type="text" 
                 ref={register({required:true})}
                 />
                <input name="branch"
                 type="text" 
                 ref={register({required:true})}
                 />
                <input name="employeeCount"
                 type="number" 
                 ref={register({required:true})}
                 />
                 <input type="submit" value="Add store"/>
            </form>
        </div>
    )
}
export default Branch;