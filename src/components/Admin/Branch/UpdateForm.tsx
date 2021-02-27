import React,{useState} from 'react';
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import StoreHandler from "../../../utils/controllers/StoreController";
interface IUpdateData{
    _id:string;
    branch:string;
    location:string
}

const UpdateForm = ({store:{_id,location,branch},setOpenUpdateForm,openUpdateForm,refreshTable,setRefreshTable}) => {
    const {handleSubmit,register,errors} = useForm();
    const [newLocation,setLocation] = useState<string>(location);
    const [newBranch,setBranch] = useState<string>(branch);

    Modal.setAppElement("body");

    const handleUpdate = (data:IUpdateData)=>{
        StoreHandler.updateStore(data).then(res=>{
            setRefreshTable(!refreshTable);
            setOpenUpdateForm(!openUpdateForm)
        })
}
    return (
        <Modal isOpen={openUpdateForm} className="update__modal">
            <button onClick={()=>setOpenUpdateForm(!openUpdateForm)}  className="close__button">X</button>
            <form className="input__form" onSubmit={handleSubmit(handleUpdate)}>
                <input type="text" name="_id" value={_id} ref={register({required:true})} readOnly></input>
                <input type="text" name="branch" value={newBranch} ref={register({required:true})} readOnly onChange={(e)=>setBranch(e.target.value)}></input>
                <input type="text" name="location" value={newLocation} ref={register({required:true})} onChange={(e)=>setLocation(e.target.value)}></input>
                <input type="submit"></input>
            </form>
        </Modal>
    )
}


export default UpdateForm
