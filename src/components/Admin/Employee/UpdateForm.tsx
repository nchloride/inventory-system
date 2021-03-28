import React from "react";
import Modal from "react-modal";
interface IEmployeeModal{
    isOpen:boolean;
    setIsOpen: (state:boolean)=>void
}

Modal.setAppElement("body");
export const EmployeeUpdateForm:React.FC<IEmployeeModal> = ({isOpen,setIsOpen}) =>{
    return(
        <Modal isOpen ={isOpen} className="modal_form">
            <button onClick={()=>setIsOpen(false)}>X</button>
            <h1>Halo Bitches</h1>
        </Modal>
    )
}
export default EmployeeUpdateForm