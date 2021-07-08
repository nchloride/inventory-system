import {FC,useContext} from "react";
import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {ProductContext} from "../../../pages/admin/products";

const ProductForm:FC = () =>{
    const productService = useContext(ProductContext);
    const {handleSubmit,register,errors,reset} = useForm();


    const postResultHandler = (result) =>{
        if(result.success){
            alert("Product added!");
            reset();
        }
        else{
            alert(result.error);
        }
    }
    const handleFormSubmit = async(data) =>{
        const result = await productService.addProduct(data);
        postResultHandler(result);
    } 
    return(
        <form onSubmit={handleSubmit(handleFormSubmit)} className="input__form product-form">
            <label>Name</label>
            <input 
                name="name"
                type="text"
                ref={register({required:true})}
            />
            <label>Price</label>
            <input 
                name="price" 
                type="number"
                ref={register({required:true})}
            />
            <label>Stocks</label>
            <input 
                name="stocks"
                type="number"
                ref={register({required:true})}
            />
            <input type="submit"/>
        </form>
    )
}
export default ProductForm;