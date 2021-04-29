import React, { useEffect,useContext, useState } from 'react';
import Modal from 'react-modal';
import {useForm} from "react-hook-form";
import {CookieContext} from "./../../../utils/context/CookieContext"

interface IStock{
    _id:string
    branch:string,
    stocks:number,
    name:string,
    price:number,
    date:string,
}

interface IUpdateProps{
    stock:Required<IStock>,
    modalOpen:boolean,
    setModalOpen: (modalOpen:boolean) => void
}
interface IBranch{
    _id:string,
    location:string,
    branch:string
}
export const InventoryUpdateForm:React.FC<IUpdateProps> = ({stock, modalOpen,setModalOpen})=>{
    const [branches,setBranches] = useState<IBranch[]>([]);
    const token = useContext(CookieContext);
    useEffect(()=>{
        (async()=>{
            await fetch("/api/stores",{
                method:"GET",
                mode:"cors",
                headers:{
                    "authorization":`Bearer ${token}`,
                    "Content-type":"application/json"
                }
            })
            .then(async data=> await data.json())
            .then((data:IBranch[]) => setBranches(data));
        })()
    },[])
    const {handleSubmit,register,errors} = useForm();
    const closeModal = () => setModalOpen(false);
    return(
        <Modal isOpen={modalOpen} className="modal_form inventory_modal" >
            <div className="modal_title">
                <h1>Update Inventory</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
            <form className="input__form inventory_form">
                <label>Branch:</label>
                <select 
                    name="branch"
                    defaultValue={stock.branch} 
                    ref={register(
                        {
                            required:true,
                            validate:{notzero:value=> value!=="0"}
                        }
                    )}
                > 
                    {branches.map(({location,branch,_id}:IBranch)=>(
                        <option
                            key={_id}
                            value={branch}
                        >
                            {branch}
                        </option>
                    ))}
                </select>
                <label>Stocks:</label>
                <input type="number" name="stocks" placeholder="Stocks" ref={register({required:true})} ></input>
                <label>Product name:</label>
                <input type="text" name="name" placeholder="Name" ref={register({required:true})} ></input>
                <label>Price:</label>
                <input type="number" name="price" placeholder="Price" ref={register({required:true})} ></input>
                <input type="submit" value="Assign product"></input>
            </form>
        </Modal>
    )

}
export default InventoryUpdateForm