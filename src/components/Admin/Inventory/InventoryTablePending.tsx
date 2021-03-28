import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import isToday from "../../../lib/isToday";
import { number } from "joi";
import {useState} from "react"
export const InventoryTablePending = ({stocks})=>{
    const [storeCount,setStoreCount] = useState<number>(2);
    const newStocks = stocks.slice(0,storeCount);

    const incrementStocks = e => setStoreCount(e.target.value);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Branch</th>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>   
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {newStocks?.map(stock=>{
                        if(isToday(stock.date))
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
                        )}
                </tbody>
            </table>
            <div className="pagination">
                <p>Stocks number</p>
                <input type="number" value={storeCount} min="5" max={stocks.length} onChange={incrementStocks}></input>
            </div>
        </>
    )
}
export default InventoryTablePending;