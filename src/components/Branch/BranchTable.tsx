import {useEffect, useState} from "react";

import StoreHandler from "../../utils/storesHandler";
export const BranchTable = ({refreshTable,setRefreshTable}) =>{
    const [stores,setStores] = useState([]);
    useEffect(() => {
        const getStores = async()=>{
            const res = await fetch("/api/stores");
            const data = await res.json();
            console.log(data);
            setStores(data);
            
        };
        getStores();
    }, [refreshTable]);
    const handleDelete = async(_id) =>{
       const response = await StoreHandler.deleteStore(_id);
       alert(response.message);
        setRefreshTable(!refreshTable);
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
                    <tr key={store?._id}>
                        <td>{store?.branch}</td>
                        <td>{store?.location}</td>
                        <td>{store?.employeeCount}</td>
                        <td>
                            <button onClick={()=>handleDelete(store?._id)} >Delete</button>
                            <button>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
BranchTable.getInitialProps = ({refreshTable,setRefreshTable}) =>{
    return{
        props:{
            refreshTable,
            setRefreshTable
        }
    }
}

  export default BranchTable;