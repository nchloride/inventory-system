import Modal from "react-modal";
import React,{useContext, useEffect} from "react";


import {useForm} from "react-hook-form";

import {BranchService} from "../../../pages/admin/branch"
Modal.setAppElement("body");

export const BranchForm  = ({open,setClose})=>{
    const StoreController = useContext(BranchService);
    const {handleSubmit,register,reset} = useForm<FormData>();
    
    interface IData {
        name:string,
        location:string,
        branch:string,
    }

    const closeModal = () => setClose(!open);

    const onSubmit = async (data:IData) =>{
        try{
            StoreController.addStore(data).then(_=>{
                reset();
                closeModal();
            })
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Modal isOpen={open}  className="modal_form ">
            <div className="modal_title">
                <h1>Add Branch</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="input__form branch_form">
                <label>Name:</label>
                <input name="branch"
                type="text" 
                ref={register({required:true})}
                placeholder="Enter branch name"
                />
                <label>Location:</label>
                <input name="location"
                type="text" 
                ref={register({required:true})}
                placeholder="Enter branch location"
                />
                <label>Status:</label>
                <select ref={register({required:true})} name="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
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
