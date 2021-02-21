import React from "react";
import { BranchTable } from "../../components/Branch/BranchTable";
import BranchForm from "../../components/Branch/BranchForm";
import { useRefreshTable } from "../../components/customHooks/useRefreshTable";
export const Branch:React.FC = () => {
    const [refreshTable,setRefreshTable]  = useRefreshTable(false);
    return (
        <div className="tab branch">
            <h1>Branch Page</h1>
            <BranchTable refreshTable ={refreshTable}  setRefreshTable= {setRefreshTable}/> 
            <BranchForm setRefreshTable= {setRefreshTable}/>
        </div>
    )
}
export default Branch;