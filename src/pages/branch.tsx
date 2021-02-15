import React, { useState } from "react";
import { BranchTable } from "../components/Branch/BranchTable";
import {useForm} from "react-hook-form";
import BranchForm from "../components/Branch/BranchForm";
export const Branch:React.FC = () => {
    const [refreshTable,setRefreshTable]  = useState<boolean>(false);
 

    return (
        <div className="tab branch">
            <h1>Branch Page</h1>
            <BranchTable refreshTable ={refreshTable}  setRefreshTable= {setRefreshTable}/>
            <BranchForm setRefreshTable= {setRefreshTable}/>
        </div>
    )
}
export default Branch;