import {FC,useContext} from "react";
import { CookieContext } from "../../../utils/context/CookieContext";
import {useForm} from "react-hook-form";
import { useEffect } from "react";

const ProductForm:FC = (props) =>{
    const token = useContext(CookieContext);
    const {handleSubmit,register,errors} = useForm();


 

    const handleFormSubmit = async(data) =>{
        console.log(data);
        const postProduct = await fetch("/api/products",{
            method:"POST",
            mode:"cors",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`,
            }
        });
        const result = await postProduct.json();
        console.log(result);
        
      
    } 
    return(
        <form onSubmit={handleSubmit(handleFormSubmit)} className="input__form">
            <input 
                name="name"
                type="text"
                ref={register({required:true})}
            />
            <input 
                name="price" 
                type="number"
                ref={register({required:true})}
            />
            <input 
                name="stocks"
                type="number"
                ref={register({required:true})}
            />
            <input type="submit"  />
        </form>
    )
}
export default ProductForm;