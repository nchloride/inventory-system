import apiMiddleware from "../../../lib/authorizationMiddleware";
import database from "../../../utils/config/database";
import isToday from "../../../lib/isToday";
import {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";
import Cors from 'cors';
const InventoryValidation = require("../../../utils/validations/inventoryAuth");
const inventory = database.get("inventory");


  const cors = Cors({
            origin:"http://localhost:3000/admin/inventory",
            methods:['GET'],
             })
export default nextConnect<NextApiRequest,NextApiResponse>()
    .use(apiMiddleware)
    .post(async(req,res)=>{
       const inventoryInformation = {...req.body,date:new Date()}   
        try {
            const validatedData = await InventoryValidation.validateAsync(inventoryInformation);
            inventory.insert(validatedData);
            res.json({
                message:"Stocks added!"
            })
        } catch (error) {
            res.json({
                error
            })
        }
    })
    .get(async(req,res)=>{
        const stocks = await inventory.find({});
        res.json(stocks);
    })
   