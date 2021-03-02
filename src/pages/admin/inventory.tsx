import axios from "axios"
import React from 'react'
import InventoryForm from '../../components/Admin/Inventory/InventoryForm'
import InventoryTablePending from "../../components/Admin/Inventory/InventoryTablePending"
import Layout from '../../Layout'
import StoreController from '../../utils/controllers/StoreController'

function Inventory({stores,stocks})  {
    return (
        <Layout>
            <div className="tab inventory">
                INVENTORY PAGE!
                <InventoryForm branches={stores}/>
                <InventoryTablePending stocks={stocks} />
            </div>
        </Layout> 
    )
}
export async function getServerSideProps(context){
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

export default Inventory
