import React from "react";
import Modal from "react-modal";
interface IEmployeeModal{
    isOpen:boolean;
    setIsOpen: (state:boolean)=>void;
    employee?:any
}

Modal.setAppElement("body");
export const EmployeeUpdateForm:React.FC<IEmployeeModal> = ({isOpen,setIsOpen,employee}) =>{
    const {name,username,_id,rate,branch} = employee;
    return(
        <Modal isOpen ={isOpen} className="modal_form employee_update_modal">
            <div className="modal_title">
                <h1>Update Employee</h1>
                <button onClick={()=>setIsOpen(false)} className="close__button">X</button>
            </div>
            <div className="input_form">
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
                <h1>{name}</h1>
            </div>
        </Modal>
    )
}
export default EmployeeUpdateForm