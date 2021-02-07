import {useEffect, useState} from "react";


export const BranchTable = ({refreshTable}) =>{
    const [store,setStores] = useState<object[]>([]);
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
            <thead></thead>
            <tbody></tbody>
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