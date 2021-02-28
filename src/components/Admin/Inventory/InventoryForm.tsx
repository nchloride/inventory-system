import {useState} from "react";
import {useForm} from "react-hook-form"


export default function InventoryForm({branches}){
    const {handleSubmit,register,reset} = useForm();
    const onFormSubmit = async(data:any) =>{
        const res = await fetch('/api/inventory',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        }).then(dataResponse=> dataResponse.json());
        console.log(res);
        
    }
    return (
        <form className="input__form inventory__form" onSubmit={handleSubmit(onFormSubmit)}>
            <select name="branch" ref={register({required:true,validate:{notzero:value=> value!=="0"}})}> 
                <option value="0">---Select a Branch---</option>
                {branches.map(({location,branch,_id})=>(
                    <option key={_id} value={branch}>{branch}</option>
                ))}
            </select>
            <input type="number" name="stocks" placeholder="Stocks" ref={register({required:true})} ></input>
            <input type="text" name="name" placeholder="Name" ref={register({required:true})} ></input>
            <input type="number" name="price" placeholder="Price" ref={register({required:true})} ></input>
            <input type="submit" value="Assign product"></input>
        </form>
    )
}