import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import InventoryForm from '../../components/Admin/Inventory/InventoryForm';
import InventoryTablePending from "../../components/Admin/Inventory/InventoryTablePending";
import Layout from '../../Layout';
import React,{useState} from 'react';
import {GetServerSideProps} from "next";
import StoreController from '../../utils/controllers/StoreController';
function Inventory({stores,stocks})  {
    const [openAddForm,setOpenAddForm] = useState<boolean>(false);

    return (
        <Layout>
            <div className="tab inventory">
                <div className="tab_title">
                    <h1>INVENTORY PAGE! </h1>
                    <button onClick={()=>setOpenAddForm(!openAddForm)} className="add_data"><AddIcon/>Add Inventory</button>
                </div>
                <InventoryTablePending stocks={stocks}/>
                <InventoryForm modalOpen={openAddForm} setModalOpen={setOpenAddForm} branches={stores}/>
            </div>
        </Layout> 
    )
}
export async function getServerSideProps<GetServerSideProps>(context){
    try{
        const fetchStore = await axios.get('http://localhost:3000/api/stores');
        const fetchStocks = await axios.get('http://localhost:3000/api/inventory');
        const [stores,stocks] = await axios.all([fetchStore,fetchStocks]);
        return{
            props:{
               stores:stores.data,
               stocks:stocks.data
            }
        }
    }
    catch(error){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }
}

export default Inventory
