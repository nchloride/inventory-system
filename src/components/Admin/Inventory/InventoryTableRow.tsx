import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

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

export const InventoryTableRow:React.FC<Partial<IStock>>= ({stock}) =>{
    return(
        <tr key={stock._id}>
            <td>{stock.branch}</td>
            <td>{stock.stocks}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.date.slice(0,10)}</td>
            <td><strong>{!stock.submittedBy? "Pending" : "Approving"}</strong></td>
            <td>
                {/* <button onClick={()=>handleDelete(stock._id,stock.name)}  className="delete_button"><DeleteForeverIcon/></button> */}
                <button className="edit_button"><EditIcon/></button>
            </td>
        </tr>
    )
}
export default InventoryTableRow