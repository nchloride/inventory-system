
import isToday from "../../../lib/isToday";
import {useEffect, useState} from "react"
import InventoryTableRow from "./InventoryTableRow";


export const InventoryTablePending = ({stocks})=>{

    const [storeCount,setStoreCount] = useState<number>(10);
    const newStocks = stocks.filter(stock=> isToday(stock.date)).slice(0,storeCount);
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
                        // if(isToday(stock.date))
                            return(
                                <InventoryTableRow key={stock._id} stock ={stock}/>
                             )
                            
                        }  
                        )}
                </tbody>
            </table>
            <div className="pagination">
                <p>Stocks number</p>
                <input type="number" value={storeCount} min="1" max={stocks.length} onChange={incrementStocks}></input>
            </div>
        </>
    )
}
export default InventoryTablePending;