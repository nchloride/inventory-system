// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiMiddleware from "../../../lib/authorizationMiddleware";
import db from "../../../utils/config/database";
import storeSchema from "../../../utils/schema/storesSchema";
import next, {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";
const jwt = require('jsonwebtoken');

const stores = db.get("stores");
export default nextConnect<NextApiRequest,NextApiResponse>()
    .use(apiMiddleware)
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
        req.body = JSON.parse(req.body);
        const {branch,location,_id,status} = req.body;
        stores.findOneAndUpdate({_id},{$set:{branch,location,status}});
            res.json({
                message:"Store updated"
            })   
    })