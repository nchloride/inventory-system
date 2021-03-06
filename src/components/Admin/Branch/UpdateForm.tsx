import React,{useState,useContext} from 'react';
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {BranchContext} from "../../../pages/admin/branch"


interface IUpdateData{
    _id:string;
    branch:string;
    location:string
}

const UpdateForm = ({store:{_id,location,branch,status},setOpenUpdateForm,openUpdateForm}) => {
    const branchService = useContext(BranchContext);
    const {handleSubmit,register,errors} = useForm();
    const [state,setState] = useState({
        location,
        branch
    })
    Modal.setAppElement("body");
    
    const handleUpdate = (data:IUpdateData)=>{
        branchService.updateStore(data).then(res=>{
            setOpenUpdateForm(!openUpdateForm)
        })
    }
    const handleOnChange = e => setState((storeState)=>{
        return {
            ...storeState,
            [e.target.name]:e.target.value
        }
    })
    return (
        <Modal isOpen={openUpdateForm} className="modal_form branch_modal">
            <div className="modal_title">
                <h1>Update Branch</h1>
                <button onClick={()=>setOpenUpdateForm(!openUpdateForm)}  className="close__button">X</button>
            </div>
            <form className="input__form branch_form" onSubmit={handleSubmit(handleUpdate)}>
                <input type="text" name="_id" id="_id" value={_id} ref={register({required:true})} readOnly></input>
                <label>Branch:</label>
                <input type="text" name="branch" value={state.branch} ref={register({required:true})} onChange={handleOnChange}></input>
                <label>Location:</label>
                <input type="text" name="location" value={state.location} ref={register({required:true})} onChange={handleOnChange}></input>
                <label>Status:</label>
                <select ref={register({required:true})} name="status" defaultValue={status}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <input type="submit"></input>
            </form>
        </Modal>
    )
}


export default UpdateForm
