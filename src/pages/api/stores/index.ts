// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../../utils/config/database";
import storeSchema from "../../../utils/validations/storesAuth";
import next, {NextApiRequest,NextApiResponse} from "next";
import nextConnect from "next-connect";
const jwt = require('jsonwebtoken');

const stores = db.get("stores");
export default nextConnect<NextApiRequest,NextApiResponse>()
    .use(async(req,res,next)=>{
        const authenticationToken = req.headers.authorization.split(" ")[1];
        jwt.verify(authenticationToken,process.env.TOKEN_KEY,(err,decoded)=>{ 
            if(err){  
                res.json({
                    isAuthenticated:false
                });
            }
            else if(decoded.role ==="admin"){
                next();
            }
        })
    })
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
        const {branch,location,_id} = req.body;
        stores.findOneAndUpdate({_id},{$set:{branch:branch,location:location}});
            res.json({
                message:"Store updated"
            })   
    })