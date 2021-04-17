import React,{useContext,useEffect,useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {CookieContext} from "../../../utils/context/CookieContext"
import {EmployeeService} from "../../../pages/admin/employees"
interface IEmployeeModal{
    isOpen:boolean;
    setIsOpen: (state:boolean)=>void;
    employee?:any
}

Modal.setAppElement("body");
export const EmployeeUpdateForm:React.FC<IEmployeeModal> = ({isOpen,setIsOpen,employee}) =>{
    const employeeController = useContext(EmployeeService);
    const {errors,handleSubmit,register,reset} = useForm();
    const {name,username,address,_id,rate,branch,password} = employee;
    const [stores,setStores] = useState([]);
    const [user,setUser] = useState({
        name,
        username,
        password,
        address,
        rate,
        branch,
    })
    const token = useContext(CookieContext);

    useEffect(()=>{
        (async function(){
            const res = await fetch("/api/stores",{
                method:"GET",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${token}`
                }
            });
            const data = await res.json();
            setStores(data);
        })()
    },[]);

    const handleOnChange = e => setUser((userInformation) => { 
        return{
            ...userInformation,
            [e.target.name]:e.target.value
        }
    });
    const handleOnSubmit = data =>{
       
        data['_id'] = _id
        employeeController.updateEmployee(data)
            .then(res=>{
                if(res.message){
                    setIsOpen(!isOpen);
                }
            })
    };
    return(
        <Modal isOpen ={isOpen} className="modal_form employee_modal">
            <div className="modal_title">
                <h1>Update Employee</h1>
                <button onClick={()=>setIsOpen(false)} className="close__button">X</button>
            </div>
            <form className="input__form employee__form" onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="employee_info">
                    <div>
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={user.name} 
                            onChange={handleOnChange}
                            ref={register({
                                required:true,
                                pattern:/[a-zA-Z]+/
                            })}
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={user.address} 
                            onChange={handleOnChange} 
                            ref={register({
                                required:true,
                                maxLength:100
                            })}
                        />
                    </div>
                </div>
                <div className="employee_credentials">
                    <div>
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={user.username} 
                            onChange={handleOnChange}
                            ref={register({
                                required:true
                            })}
                        />
                    </div>
                    <div>
                        <label>New Password</label>
                        <input 
                            type="password" 
                            name="newPassword" 
                            placeholder="New Password" 
                            ref={register({
                                required:false
                            })}
                        />
                    </div>
                </div>
                <div className="employee_work_info">
                    <div>
                        <label>Branch</label>
                        <select 
                            defaultValue={branch} 
                            name="branch"
                            ref={register({
                                required:true
                            })}
                        >
                            {stores.map((store,id)=>(
                                <option key={id} value={store.branch} >
                                    {store.branch}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Rate</label>
                        <input 
                            type="number" 
                            name="rate" 
                            value={user.rate} 
                            onChange={handleOnChange} 
                            ref={register({
                                required:true
                            })}
                        />
                    </div>
                </div>
                <input type="submit"></input>
            </form>
        </Modal>
    )
}

export default EmployeeUpdateForm