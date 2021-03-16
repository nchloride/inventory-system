import apiMiddleware from "../../../lib/authorizationMiddleware"
import nextConnect from "next-connect";
import db from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next"
const stores = db.get("stores");

export default nextConnect<NextApiRequest,NextApiResponse>()
    .use(apiMiddleware)
    .delete(async(req,res)=>{
        const {_id} = req.query;
        try{
            stores.findOneAndDelete({_id});
            res.json({
                message:"Data deleted!",
            })
        }
        catch(error){
            res.json({
                error
            })
        }
    })

