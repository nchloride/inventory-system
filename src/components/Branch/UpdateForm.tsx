import React from 'react';
import Modal from "react-modal";
import {useForm} from "react-hook-form";
const UpdateForm = ({store:{_id,location,branch},setOpenUpdateForm,openUpdateForm}) => {
    Modal.setAppElement("body");
    return (
        <Modal isOpen={openUpdateForm} className="update__modal">
            <button onClick={()=>setOpenUpdateForm(!openUpdateForm)}>X</button>
            <form>

            </form>
        </Modal>
    )
}


export default UpdateForm
