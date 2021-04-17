import Modal from "react-modal";
import React, { useEffect, useState,useContext } from 'react';
import {useForm} from "react-hook-form";
import {EmployeeService} from "../../../pages/admin/employees"


const EmployeeForm = ({stores,openModal,setOpenModal}) => {
    const employeeController = useContext(EmployeeService);
    const {errors,handleSubmit,register,reset} = useForm();
    const [inputError,setInputError] = useState({
        alreadyExist:false,
    })
    enum Roles{
        'admin',
        'employee'
    }
    interface IEmployee{
        name:string,
        address:string,
        branch:string,
        rate:number,
        password:string,
        username:string,
        role:Roles
    }
    const onFormSubmit = (data:IEmployee) =>{
        employeeController.setEmployee(data).then(data=>{
            console.log(data);
            if(data.added){
                reset();
                setInputError({alreadyExist:false});
            }
            else{
                setInputError({alreadyExist:true});
            }
        });
        
    }
    const closeModal = () => setOpenModal(!openModal)
    return (
        <Modal isOpen={openModal} className="modal_form employee_modal">
            <div className="modal_title">
                <h1>Add Employee</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)} className="input__form employee__form">
                <div className="employee_info">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" ref={register({required:true})} ></input>
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address" ref={register({required:true})} ></input>
                    </div>
                </div>
                <div className="employee_credentials">
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" ref={register({required:true,pattern:/^[a-zA-Z0-9]*$/})} ></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" ref={register({required:true,pattern:/^[a-zA-Z0-9]*$/})} ></input>
                    </div>
                </div>
                <div className="employee_work_info">
                    <div>
                        <label>Branch</label>
                        <select name="branch" placeholder="Branch"
                            ref={
                                register(
                                    {
                                        required:true,
                                        validate:{
                                            notNull:(value:string)=>value!=="0"
                                        }
                                    }
                                )
                            }>
                            <option value="0">---Select a branch---</option>
                            {stores.map((store)=>(
                                <option value={store.branch} key={store._id}>{store.branch}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Role</label>
                        <select name="role" placeholder="Role"
                            ref={
                                register(
                                    {
                                        required:true,
                                        validate:{
                                            notNull:(value:string)=>value!=="0"
                                        }
                                    }
                                )
                            }>
                            <option value="0">---Select Role---</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                </div>
                <label>Rate</label>
                <input type="number" name="rate" placeholder="Rate" ref={register({required:true})}></input>
                <input type="submit" value="Add employee"></input>
                {inputError.alreadyExist &&"Employee already exist"}
            </form>
        </Modal>
    )
}

export default EmployeeForm
