import Modal from "react-modal";
import React from "react";
import StoreController from "../../../utils/controllers/StoreController";
import { useRouter } from "next/router";
import {useForm} from "react-hook-form";
export const BranchForm  = ({open,setClose})=>{
    const router = useRouter();
    const storeController = new StoreController(router);
    const {handleSubmit,register,reset} = useForm<FormData>();
    
    interface IData {
        name:string,
        location:string,
        branch:string,
    }

    const closeModal = () => setClose(!open);

    const onSubmit = async (data:IData) =>{
        try{
            storeController.addStore(data).then(_=>{
                reset();
                closeModal();
            })
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Modal isOpen={open}  className="modal_form">
            <div className="modal_title">
                <h1>Add Branch</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
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
        </Modal>
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
