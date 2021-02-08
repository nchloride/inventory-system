import {useEffect, useState} from "react";
export const BranchTable = ({refreshTable}) =>{
    const [stores,setStores] = useState([]);
    useEffect(() => {
        const getStores = async()=>{
            const res = await fetch("/api/stores");
            const data = await res.json();
            console.log(data);
            setStores(data);
            
        };
        getStores();
    }, [refreshTable])
    return (
        <table>
            <thead>
                <tr>
                    <th>Branch</th>
                    <th>Location</th>
                    <th>Employee Count</th>
                </tr>
            </thead>
            <tbody>
                {stores?.map((store)=>(
                    <tr>
                        <td>{store?.branch}</td>
                        <td>{store?.location}</td>
                        <td>{store?.employeeCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
BranchTable.getInitialProps = ({refreshTable}) =>{
    return{
        props:{
            refreshTable
        }
    }
}

  export default BranchTable;