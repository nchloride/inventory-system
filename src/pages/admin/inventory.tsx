import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import cookie from "cookie";
import {CookieContext} from "../../utils/context/CookieContext";
import InventoryForm from '../../components/Admin/Inventory/InventoryForm';
import InventoryTablePending from "../../components/Admin/Inventory/InventoryTablePending";
import Layout from '../../Layout';
import {useRouter} from "next/router"

import React,{useState,createContext,useContext} from 'react';
import InventoryService from "../../utils/service/InventoryService";

const jwt = require("jsonwebtoken");


export const InventoryContext = createContext(null);

function Inventory({stores,stocks,user})  {
    const [openAddForm,setOpenAddForm] = useState<boolean>(false);
    const token = useContext(CookieContext);
    const router = useRouter();
    const inventoryController = new InventoryService(router,token);
    return (
        <InventoryContext.Provider value={inventoryController}>
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
        </InventoryContext.Provider>
    )
}
export async function getServerSideProps({req,res}){
    const {token} = cookie.parse(req.headers.cookie || "");
    if(token)
    {
        const {role,...user} = jwt.verify(token,process.env.TOKEN_KEY);
        try{
            const [stores,stocks] = await axios.all(
            [
                axios.get('http://localhost:3000/api/stores',
                        {
                            headers:{"authorization":`Bearer ${token}`}
                        }
                    ),
                axios.get('http://localhost:3000/api/inventory',
                        {
                            headers:{"authorization":`Bearer ${token}`}
                        }
                    )
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
}

export default Inventory
