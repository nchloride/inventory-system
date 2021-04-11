import React,{useState,useContext} from 'react';
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import StoreController from "../../../utils/controllers/StoreController";
import { useRouter } from 'next/router';
import {CookieContext} from "../../../utils/context/CookieContext"

interface IUpdateData{
    _id:string;
    branch:string;
    location:string
}

const UpdateForm = ({store:{_id,location,branch},setOpenUpdateForm,openUpdateForm}) => {
    const token = useContext(CookieContext);
    
    const router = useRouter();
    const storeController = new StoreController(router,token);
    const {handleSubmit,register,errors} = useForm();
    const [newLocation,setLocation] = useState<string>(location);
    const [newBranch,setBranch] = useState<string>(branch);
    const [state,setState] = useState({
        location,
        branch
    })
    Modal.setAppElement("body");
    
    const handleUpdate = (data:IUpdateData)=>{
        console.log(data);
        
        storeController.updateStore(data).then(res=>{
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
        <Modal isOpen={openUpdateForm} className="modal_form">
            <div className="modal_title">
                <h1>Update Branch</h1>
                <button onClick={()=>setOpenUpdateForm(!openUpdateForm)}  className="close__button">X</button>
            </div>
            <form className="input__form branch_form" onSubmit={handleSubmit(handleUpdate)}>
                <label>Id:</label>
                <input type="text" name="_id" id="_id" value={_id} ref={register({required:true})} readOnly></input>
                <label>Branch:</label>
                <input type="text" name="branch" value={state.branch} ref={register({required:true})} onChange={handleOnChange}></input>
                <label>Location:</label>
                <input type="text" name="location" value={state.location} ref={register({required:true})} onChange={handleOnChange}></input>
                <input type="submit"></input>
            </form>
        </Modal>
    )
}


export default UpdateForm
