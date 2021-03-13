import InventoryController from "../../../utils/controllers/InventoryController";
import Modal from "react-modal";
import {useState} from "react";
import {useForm} from "react-hook-form"
import {useRouter} from "next/router";


export default function InventoryForm({branches,modalOpen,setModalOpen}){
    const {handleSubmit,register,reset} = useForm();
    const router = useRouter();
    const inventory = new InventoryController(router);

    const onFormSubmit = async(data:any) =>{
        inventory.setStocks(data)
            .then(data=>{
                reset()
            }
        );
    }

    const closeModal = () => setModalOpen(!modalOpen)
    return (
        <Modal isOpen={modalOpen} className="modal_form">
            <div className="modal_title">
                <h1>Add Inventory</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
            <form className="input__form inventory__form" onSubmit={handleSubmit(onFormSubmit)}>
                <select name="branch" ref={register({required:true,validate:{notzero:value=> value!=="0"}})}> 
                    <option value="0">---Select a Branch---</option>
                    {branches.map(({location,branch,_id})=>(
                        <option key={_id} value={branch}>{branch}</option>
                    ))}
                </select>
                <input type="number" name="stocks" placeholder="Stocks" ref={register({required:true})} ></input>
                <input type="text" name="name" placeholder="Name" ref={register({required:true})} ></input>
                <input type="number" name="price" placeholder="Price" ref={register({required:true})} ></input>
                <input type="submit" value="Assign product"></input>
            </form>
        </Modal>
    )
}