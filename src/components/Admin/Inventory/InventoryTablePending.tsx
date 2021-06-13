import intervalFilter from '../../../utils/helper/intervalFilter'
import {useEffect, useState} from "react"
import InventoryTableRow from "./InventoryTableRow";
import {IStocks} from "../../../types/inventory";
enum EInterval{
    all='all',
    day='day',
    week='week',
    month='month'
}

export const InventoryTablePending = ({stocks}:{stocks:IStocks[]})=>{
    const [interval,setInterval] = useState<string>(EInterval.all); 
    const [storeCount,setStoreCount] = useState<number>(10);
 
    const intervals = Object.keys(EInterval);
    const newStocks = intervalFilter(interval,stocks,storeCount);
    const incrementStocks = e => setStoreCount(e.target.value);

    const intervalOnChange = (e) =>{
        setInterval(e.target.value)
    }
    return (
        <>
            <select onChange={intervalOnChange} >
                {intervals.map((int,id)=>(
                    <option value={int} key={id}>{int}</option>
                ))}
            </select>
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