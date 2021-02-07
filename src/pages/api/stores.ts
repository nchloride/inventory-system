// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/database";
import storeSchema from "../../utils/Auth/storesAuth";
import {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";


const stores = db.get("stores");
let storesCache = [];
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
        if(storesCache === []){
            const storesArray:object[] = await stores.find({});
            res.json(storesArray);
            storesCache = storesArray;
        }
        else{
            res.json(storesCache);
        }
    })
