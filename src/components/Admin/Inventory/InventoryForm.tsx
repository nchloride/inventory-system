import InventoryController from "../../../utils/service/InventoryService";
import Modal from "react-modal";
import {useState,useContext} from "react";
import {useForm} from "react-hook-form"

import {InventoryContext} from "../../../pages/admin/inventory";
import { useRef } from "react";

interface ISelectedProduct{
    _id:string,
    name:string,
    stocks:number,
    price:number
}
Modal.setAppElement("body");
export default function InventoryForm({branches,modalOpen,setModalOpen,products}){
    const {handleSubmit,register,reset} = useForm();
    const inventory = useContext(InventoryContext);
    const [selectedProduct,setSelectedProduct] = useState<ISelectedProduct>();
    const productOption = useRef();
    const onFormSubmit = async(data:any) =>{
        inventory.setStocks(data)
            .then(data=>{
                console.log(data);
                reset()
            }
        );
    }
    const closeModal = () => setModalOpen(!modalOpen);

    const handleSelectOnChange = (e) =>{
        if(e.target.value !== "0"){
            const productData = products.filter(product=> product.name === e.target.value);
            console.log(productData[0]);
            
            setSelectedProduct(productData[0]);
        }
    }
    return (
        <Modal isOpen={modalOpen} className="modal_form inventory_modal">
            <div className="modal_title">
                <h1>Add Inventory</h1>
                <button onClick={closeModal} className="close__button">X</button>
            </div>
            <form className="input__form inventory_form" onSubmit={handleSubmit(onFormSubmit)}>
                <label>Branch:</label>
                <select name="branch" ref={register({required:true,validate:{notzero:value=> value!=="0"}})}> 
                    <option value="0">---Select a Branch---</option>
                    {branches.map(({location,branch,_id})=>(
                        <option
                            key={_id}
                            value={branch}
                        >
                            {branch}
                        </option>
                    ))}
                </select>
                <label>Product name:</label>
                <select name="name" ref={register({required:true})} onChange={handleSelectOnChange}>
                    <option value="0">---Select Product---</option>
                    {products.map((product,id)=>(
                        <option ref={productOption} key={id} value={product.name}>{product.name}</option>
                    ))}
                </select>
                {
                    selectedProduct && (
                        <>
                            <div className="selected__product">
                                <div className="selected__product__card">
                                    <label>Price:</label>
                                    {selectedProduct.price+'php'}
                                </div>
                                <div className="selected__product__card">
                                    <label>Stock:</label>
                                    {selectedProduct.stocks+"pcs"}
                                </div>
                            </div>
                            <label>Stocks:</label>
                            <input type="number" name="stocks" placeholder="Stocks" max={selectedProduct?.stocks || 0} ref={register({required:true})} ></input>
                        </>
                    )
                }
                <input type="submit" value="Assign product"></input>
            </form>
        </Modal>
    )
}