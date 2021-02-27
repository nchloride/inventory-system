import {useEffect, useState} from "react";
import StoreHandler from "../../../utils/controllers/StoreController";
import BranchTableRow from "./BranchTableRow";

export const BranchTable = ({refreshTable,setRefreshTable}) =>{
    const [stores,setStores] = useState([]);

    useEffect(() => {
        StoreHandler.getStores().then((data):void=>{
            setStores(data);
        })
    }, [refreshTable]);
    const handleDelete = (_id,branch:string):void =>{
        if(confirm("Are you sure you want to delete this branch?"))
            if(prompt(`Type "${branch}" to delete this store`) === branch)
                StoreHandler.deleteStore(_id).then((data):void=>{
                    alert(data.message);
                    setRefreshTable(!refreshTable);    
                });
    }
   
    return (
        <table>
            <thead>
                <tr>
                    <th>Branch</th>
                    <th>Location</th>
                    <th>Employee Count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {stores?.map((store)=>(
                    <BranchTableRow store={store} refreshTable={refreshTable}setRefreshTable={setRefreshTable} handleDelete={handleDelete}  key={store._id}/>
                ))}
            </tbody>
        </table>
    )
}


  export default BranchTable;