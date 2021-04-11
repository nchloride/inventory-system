import React,{useContext,useEffect,useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {CookieContext} from "../../../utils/context/CookieContext"
interface IEmployeeModal{
    isOpen:boolean;
    setIsOpen: (state:boolean)=>void;
    employee?:any
}

Modal.setAppElement("body");
export const EmployeeUpdateForm:React.FC<IEmployeeModal> = ({isOpen,setIsOpen,employee}) =>{
    const {errors,handleSubmit,register} = useForm();
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
    return(
        <Modal isOpen ={isOpen} className="modal_form employee_modal">
            <div className="modal_title">
                <h1>Update Employee</h1>
                <button onClick={()=>setIsOpen(false)} className="close__button">X</button>
            </div>
            <form className="input__form employee__form">
                <div className="employee_info">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleOnChange}></input>
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" name="address" value={user.address} onChange={handleOnChange} ></input>
                    </div>
                </div>
                <div className="employee_credentials">
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleOnChange}/>
                    </div>
                    <div>
                        <label>Old Password</label>
                        <input type="password" name="oldPassword" placeholder="Old Password"  ></input>
                    </div>
                    <div>
                        <label>New Password</label>
                        <input type="password" name="newPassword" placeholder="New Password" ></input>
                    </div>
                </div>
                <label>Branch</label>
                <select defaultValue={branch}>
                    {stores.map((store,id)=>(
                        <option key={id} value={store.branch} >
                            {store.branch}
                        </option>
                    ))}
                </select>
                <label>Rate</label>
                <input type="number" value={user.rate} onChange={handleOnChange} ></input>
                <input type="submit"></input>
            </form>
        </Modal>
    )
}
export default EmployeeUpdateForm