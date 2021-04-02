import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import InventoryForm from '../../components/Admin/Inventory/InventoryForm';
import InventoryTablePending from "../../components/Admin/Inventory/InventoryTablePending";
import Layout from '../../Layout';
import React,{useState} from 'react';
import {GetServerSideProps} from "next";
import cookie from "cookie"
import StoreController from '../../utils/controllers/StoreController';
function Inventory({stores,stocks,user})  {
    const [openAddForm,setOpenAddForm] = useState<boolean>(false);

    return (
        <Layout user={user}>
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
export async function getServerSideProps({req,res}){
    const {token,...user} = cookie.parse(req.headers.cookie || "");
    try{
          const [stores,stocks] = await axios.all(
            [
                axios.get('http://localhost:3000/api/stores',{headers:{"authorization":`Bearer ${token}`}}),
                axios.get('http://localhost:3000/api/inventory')
            ]);
        return{
            props:{
               stores:stores.data,
               stocks:stocks.data,
               user
            }
        }
    }catch(error){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }
}

export default Inventory
