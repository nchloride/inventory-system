import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Check from '@material-ui/icons/Check';
import React, { useState } from 'react';
import InventoryUpdateForm from './UpdateForm';

interface IStock{
    stock:{
        _id:string
        branch:string,
        stocks:number,
        name:string,
        price:number,
        date:string,
        submittedBy?:string,
    }
}

export const InventoryTableRow:React.FC<IStock>= ({stock}) =>{
    const [modalOpen,setModalOpen] = useState<boolean>(false);

    const openModal = () => setModalOpen(true);
    return(
        <>
            <tr key={stock._id}>
                <td>{stock.branch}</td>
                <td>{stock.stocks}</td>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td>{stock.date.slice(0,10)}</td>
                <td><strong>{!stock.submittedBy? "Pending" : "Approving"}</strong></td>
                <td>
                    {/* <button onClick={()=>handleDelete(stock._id,stock.name)}  className="delete_button"><DeleteForeverIcon/></button> */}
                    <button className="delete_button"><DeleteForever/></button>
                    <button className="edit_button" onClick={openModal}><EditIcon/></button>
                    {stock.submittedBy && <button className="accept_button"><Check/></button> }
                
                    
                </td>
            </tr>
            <InventoryUpdateForm stock={stock} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </>
    )
}
export default InventoryTableRow