import {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";
import database from "../../../utils/config/database";
//import {InventoryValidation} from "../../../utils/validations/inventoryAuth";
const InventoryValidation = require("../../../utils/validations/inventoryAuth");
const inventory = database.get("inventory");

export default nextConnect<NextApiRequest,NextApiResponse>()
    .post(async(req,res)=>{
        try {
            const validatedData = await InventoryValidation.validateAsync(req.body);
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