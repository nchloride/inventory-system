import React from 'react'
import InventoryForm from '../../components/Admin/Inventory/InventoryForm'
import Layout from '../../Layout'
import StoreController from '../../utils/controllers/StoreController'

function Inventory({stores})  {
    return (
        <Layout>
            <div className="tab inventory">
                INVENTORY PAGE!
                <InventoryForm branches={stores}/>
            </div>
        </Layout> 
    )
}
export async function getServerSideProps(context){
    const data = await fetch('http://localhost:3000/api/stores');
    const stores = await data.json();
    
    
    return{
        props:{
           stores
        }
    }
}

export default Inventory
