import { useRouter } from "next/router";
import {useEffect, useContext} from "react";
import StoreController from "../../../utils/controllers/StoreController";
import BranchTableRow from "./BranchTableRow";
import {CookieContext} from "../../../utils/context/CookieContext"
export const BranchTable = ({stores,employees}) =>{
    const router = useRouter();
    const token = useContext(CookieContext);
    const storeController = new StoreController(router,token);
    const handleDelete = (_id,branch:string):void =>{
        if(confirm("Are you sure you want to delete this branch?"))
            if(prompt(`Type "${branch}" to delete this store`) === branch)
                storeController.deleteStore(_id).then((data):void=>{
                    alert(data.message);
                });
    }
   
    return (
        <table>
            <thead>
                <tr>
                    <th>Branch</th>
                    <th>Location</th>
                    <th>Employee Count</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {stores?.map((store)=>(
                    <BranchTableRow store={store}  handleDelete={handleDelete}  key={store._id}/>
                ))}
            </tbody>
        </table>
    )
}


  export default BranchTable;