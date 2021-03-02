import database from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";
const InventoryValidation = require("../../../utils/validations/inventoryAuth");
const inventory = database.get("inventory");



export default nextConnect<NextApiRequest,NextApiResponse>()
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
        res.json(await inventory.find({}))
    })