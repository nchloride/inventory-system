// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../../utils/database";
import storeSchema from "../../../utils/Auth/storesAuth";
import {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";


const stores = db.get("stores");
export default nextConnect<NextApiRequest,NextApiResponse>()
    .post( async (req,res)=>{
        try {
            req.body = JSON.parse(req.body);
            const validatedData = await storeSchema.validateAsync(req.body);
            stores.insert(validatedData);
            res.json({
                message:"Store Added",
                validatedData
            })
        } catch (error) {
            res.json({
                error
            })
        }
    })
    .get(async(req,res)=>{
        const storesArray:object[] = await stores.find({});
        res.json(storesArray);
    })
    .patch(async(req,res)=>{
        const {branch,location,name,_id} = req.body;
        try {
            await stores.findOneAndUpdate({_id},{branch,location,name});
            res.json({
                message:"Store updated"
            })
        } catch (error) {
            res.json(error);
        }
     
    })