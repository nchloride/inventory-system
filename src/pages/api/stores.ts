// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/database";
import storeSchema from "../../utils/Auth/storesAuth";
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
                message:"Store Added"
            })
        } catch (error) {
            res.json({
                error
            })
        }
    })
